from flask import request, jsonify
from Database_Server import app, db, Category  # 기존의 Category 모델을 임포트
import random

# 사용자 ID에 따른 단어를 가져오는 API 엔드포인트 정의
@app.route('/game-words', methods=['GET'])
def get_game_words():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # 사용자 ID로 필터링된 카테고리를 데이터베이스에서 가져옵니다.
    user_categories = Category.query.filter_by(user_id=user_id).all()
    if not user_categories:
        # 사용자가 없을 경우 빈 배열을 반환합니다.
        return jsonify([]), 404

    # 사용자의 카테고리에서 무작위로 단어를 선택합니다.
    user_words_count = len(user_categories) // 2
    user_words = random.sample(user_categories, min(user_words_count, 15))

    # 모든 카테고리에서 무작위로 단어를 선택합니다.
    all_categories = Category.query.all()
    all_words_count = len(all_categories) // 2
    all_words = random.sample(all_categories, min(all_words_count, 15))

    # 선택된 단어들을 결합합니다.
    selected_words = user_words + all_words
    if len(selected_words) > 30:
        selected_words = random.sample(selected_words, 30)

    # 단어 리스트를 JSON 형식으로 반환합니다.
    words_list = [{"english": word.english, "korean": word.korean, "category": word.category} for word in selected_words]
    return jsonify(words_list)
