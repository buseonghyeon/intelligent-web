from flask import request, jsonify
from sqlalchemy import func, text
from Database_Server import app, db

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

if __name__ == '__main__':
    app.run(debug=True)
