from flask import request, jsonify
from datetime import datetime
from sqlalchemy import func,text
from Database_Server import app, db, Category, Es, Ms, Hs

# 카테고리별 통계
@app.route('/category-stats/<user_id>', methods=['GET'])
def category_stats(user_id):
    stats = db.session.query(
        Category.category,
        func.count(Category.id).label('count')
    ).filter_by(user_id=user_id).group_by(Category.category).all()

    result = [{'category': stat.category, 'count': stat.count} for stat in stats]
    return jsonify(result)

# 월별 통계
@app.route('/monthly-stats/<user_id>', methods=['GET'])
def monthly_stats(user_id):
    stats = db.session.query(
        func.date_format(Category.date, '%Y-%m').label('month'),
        func.count(Category.id).label('count')
    ).filter_by(user_id=user_id).group_by(func.date_format(Category.date, '%Y-%m')).all()

    result = [{'month': stat.month, 'count': stat.count} for stat in stats]
    return jsonify(result)

# 특정 날짜의 검색 로그
@app.route('/search-log/<user_id>/<date>', methods=['GET'])
def search_log(user_id, date):
    logs = Category.query.filter_by(user_id=user_id, date=datetime.strptime(date, '%Y-%m-%d').date()).all()
    log_list = [{
        'korean': log.korean,
        'english': log.english,
        'category': log.category,
        'synonym': log.synonym,
        'example_sentence': log.example_sentence,
        'translation_in_korean': log.translation_in_korean,
        'image': log.image
    } for log in logs]
    return jsonify(log_list)

# 새로운 카테고리 항목 추가
@app.route('/add-category', methods=['POST'])
def add_category():
    data = request.get_json()
    try:
        new_category = Category(
            user_id=data['user_id'],
            category=data['category'],
            korean=data['korean'],
            english=data['english'],
            image=data.get('image'),
            synonym=data.get('synonym'),
            example_sentence=data.get('example_sentence'),
            translation_in_korean=data.get('translation_in_korean'),
            definition=data.get('definition'),
            synonym_definition=data.get('synonym_definition'),
            date=datetime.now().date()  # 현재 날짜를 date 필드에 할당
        )
        db.session.add(new_category)
        db.session.commit()
        return jsonify({'message': 'Category added successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# 초등학교 데이터 가져오기
@app.route('/elementary/<int:day>', methods=['GET'])
def get_elementary_data(day):
    try:
        start = (day - 1) * 10 + 1
        end = day * 10
        query = text("SELECT * FROM es WHERE id BETWEEN :start AND :end")
        data = db.session.execute(query, {'start': start, 'end': end}).fetchall()
        result = [dict(row._mapping) for row in data]
        print(result)  # 디버깅 로그 추가
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")  # 오류 메시지 출력
        return jsonify({"error": str(e)}), 500

# 중학교 데이터 가져오기
@app.route('/middle/<int:day>', methods=['GET'])
def get_middle_data(day):
    try:
        start = (day - 1) * 10 + 1
        end = day * 10
        query = text("SELECT * FROM ms WHERE id BETWEEN :start AND :end")
        data = db.session.execute(query, {'start': start, 'end': end}).fetchall()
        result = [dict(row._mapping) for row in data]
        print(result)  # 디버깅 로그 추가
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")  # 오류 메시지 출력
        return jsonify({"error": str(e)}), 500

# 고등학교 데이터 가져오기
@app.route('/high/<int:day>', methods=['GET'])
def get_high_data(day):
    try:
        start = (day - 1) * 10 + 1
        end = day * 10
        query = text("SELECT * FROM hs WHERE id BETWEEN :start AND :end")
        data = db.session.execute(query, {'start': start, 'end': end}).fetchall()
        result = [dict(row._mapping) for row in data]
        print(result)  # 디버깅 로그 추가
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")  # 오류 메시지 출력
        return jsonify({"error": str(e)}), 500

# 모든 학력의 단어 가져오기
@app.route('/words', methods=['GET'])
def get_words():
    es_words = Es.query.all()
    ms_words = Ms.query.all()
    hs_words = Hs.query.all()

    words = [word.word for word in es_words] + [word.word for word in ms_words] + [word.word for word in hs_words]
    return jsonify(words)

if __name__ == '__main__':
    app.run(debug=True)
