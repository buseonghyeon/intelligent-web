from flask import Flask
from flask_cors import CORS
from Database_Server import app, db
# CORS 설정
CORS(app)

# 엔드포인트 파일 임포트
import login
import register
import generate_image
import translate

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # 데이터베이스 테이블 생성
    app.run(debug=True)
