from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), unique=False, nullable=False)
    lastName = db.Column(db.String(70), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(257), unique=False, nullable=False)
    favorites = db.relationship("Favorite",backref="user",lazy=True)
    recently_watched = db.relationship("Recently_Watched",backref="user",lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "lastName":self.lastName,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    def serialize_favorites(self):
        return [favorite.serialize() for favorite in self.favorites]
    
    def serialize_recently_watched(self):
        return [recently_watched.serialize() for recently_watched in self.recently_watched]
    
class Favorite(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    film_id = db.Column(db.Integer)
    film_name = db.Column(db.String(120))
    is_movie = db.Column(db.Boolean,nullable=False)


    def serialize(self):
        return{
            "id":self.id,
            "film_id":self.film_id,
            "film_name":self.film_name,
            "is_movie":self.is_movie

        }
class Recently_Watched(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    film_id = db.Column(db.Integer)
    film_name = db.Column(db.String(120))
    is_movie = db.Column(db.Boolean,nullable=False)


    def serialize(self):
        return{
            "id":self.id,
            "film_id":self.film_id,
            "film_name":self.film_name,
            "is_movie":self.is_movie

        }
