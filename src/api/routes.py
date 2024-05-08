"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User ,Favorite, Recently_Watched
from flask_jwt_extended import jwt_required, create_access_token
from flask_bcrypt import Bcrypt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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
            access_token = create_access_token(identity=user.id)
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
        return jsonify({"Error":"Missing Info"})


    if user is None:
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(name=name,lastName=last_name,email=email,password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"Message":"User Created"})

    return jsonify({"Message":"User already exist"})
