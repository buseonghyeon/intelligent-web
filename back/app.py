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
import search_log

@app.route('/categories', methods=['GET'])
def get_categories():
    user_id = request.args.get('userId')
    categories = Category.query.filter_by(user_id=user_id).all()
    categories_list = [{"english": c.english, "korean": c.korean, "image": c.image} for c in categories]
    return jsonify(categories_list)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # 데이터베이스 테이블 생성
    app.run(debug=True)
