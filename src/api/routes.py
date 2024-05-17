"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User ,Favorite, Recently_Watched
from flask_jwt_extended import jwt_required, create_access_token,get_jwt_identity
from flask_bcrypt import Bcrypt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta

bcrypt = Bcrypt()
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
@api.route('/token',methods=['POST'])
def create_token():

    email = request.json.get("email",None)
    password = request.json.get("password",None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password,password):
            access_token = create_access_token(identity=user.id,expires_delta=timedelta(days=3650))
            return jsonify({"token":access_token,"user_id":user.id}),200
    
    return jsonify({"error":"User or Password not Found"}),401



@api.route('/register',methods=['POST'])
def register():

    name = request.json.get('name',None)
    last_name = request.json.get('lastName',None)
    email = request.json.get('email',None)
    password = request.json.get('password',None)

    user = User.query.filter(User.email == email).first()

    if name == None or last_name == None or email == None or password == None:
        return jsonify({"Error":"Missing Info"}),404


    if user is None:
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(name=name,lastName=last_name,email=email,password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"Message":"User Created"}),200

    return jsonify({"Message":"User already exist"}),409

@api.route('/favorites',methods=["GET"])
@jwt_required()
def getFavorites():
     current_user_id = get_jwt_identity()
     user = User.query.get(current_user_id)

     return jsonify({"Favorites":user.serialize_favorites()}),200

@api.route('/recently_watched',methods=["GET"])
@jwt_required()
def getRecents():
     current_user_id = get_jwt_identity()
     user = User.query.get(current_user_id)

     return jsonify({"Recently_Watched":user.serialize_recently_watched()}),200

@api.route('/favorites',methods=["POST"])
@jwt_required()
def addFavorite():
    
    data = request.get_json()

    if "film_id" not in data or "film_name" not in data or "is_movie" not in data or "film_image" not in data:
        return jsonify({"Error":"Missing Data"}),400

    film_id = data["film_id"]
    film_name = data["film_name"]
    film_image = data["film_image"]
    is_movie = data["is_movie"]
    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)
    for favorite in user.serialize_favorites():
        if favorite["film_id"] == film_id and favorite["is_movie"] is is_movie:
              return jsonify({"Message":"Favorite already used"}),200
         

    new_favorite = Favorite(user_id=current_user_id,film_id=film_id,film_name=film_name,film_image=film_image,is_movie=is_movie) 
     
    db.session.add(new_favorite)
    db.session.commit()
     
    return jsonify({"message": "Favorite created successfully"}), 201

@api.route('/recently_watched',methods=["POST"])
@jwt_required()
def addRecently():
     
    data = request.get_json()

    if "film_id" not in data or "film_name" not in data or "is_movie" not in data or "film_image" not in data:
        return jsonify({"Error":"Missing Data"}),400

    film_id = data["film_id"]
    film_name = data["film_name"]
    film_image = data["film_image"]
    is_movie = data["is_movie"]
    current_user_id = get_jwt_identity()
     
    user = User.query.get(current_user_id)
    for recent in user.serialize_recently_watched():
        if recent["film_id"] == film_id and recent["is_movie"] is is_movie:
              return jsonify({"Message":"Recent Viewed already used"}),200

    new_recent = Recently_Watched(user_id=current_user_id,film_id=film_id,film_name=film_name,film_image=film_image,is_movie=is_movie) 
     
    db.session.add(new_recent)
    db.session.commit()
     
    return jsonify({"message": "Recently Watched created successfully"}), 201

@api.route('/favorites',methods=["DELETE"])
@jwt_required()
def deleteFavorite():
     favorite_id = request.json.get("favorite_id")
     favorite_to_delete = Favorite.query.get(favorite_id)

     if favorite_to_delete is None:
          return jsonify({"Message":"Favorite Does Not Exist"}),404
    
     db.session.delete(favorite_to_delete)
     db.session.commit()

     return jsonify({"Message":"Favorite Deleted"}),201

@api.route('/recently_watched',methods=["DELETE"])
@jwt_required()
def deleteRecently():
     recently_id = request.json.get("recently_id")
     recently_to_delete = Recently_Watched.query.get(recently_id)

     if recently_to_delete is None:
          return jsonify({"Message":"Recently Watched Does Not Exist"}),404
    
     db.session.delete(recently_to_delete)
     db.session.commit()

     return jsonify({"Message":"Recently Watched Deleted"}),200

@api.route('/profile',methods=["GET"])
@jwt_required()
def getProfile():
     current_user_id = get_jwt_identity()
     user = User.query.get(current_user_id)

     return jsonify(user.serialize())

@api.route('/profile/password',methods=["PUT"])
@jwt_required()
def changePassword():
     current_user_id = get_jwt_identity()
     user = User.query.get(current_user_id)
     password = request.json.get('password',None)
     password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
     user.password = password_hash
     db.session.commit()
     return jsonify({"Message":"Password Changed"}),200

@api.route('/profile/email',methods=["PUT"])
@jwt_required()
def changeEmail():
     current_user_id = get_jwt_identity()
     
     email = request.json.get('email',None)
     user = User.query.get(current_user_id)

     existing_email = User.query.filter_by(email=email).first()

     if existing_email is None:
        user.email = email
        db.session.commit()
        return jsonify({"Message":"Email Changed"}),200
     
     return jsonify({"Message":"Email in use"}),409

     