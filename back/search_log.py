from flask import request, jsonify
from datetime import datetime
from sqlalchemy import func
from Database_Server import app, db, Category

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

if __name__ == '__main__':
    app.run(debug=True)
