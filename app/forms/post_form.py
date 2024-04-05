from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class PostForm(FlaskForm):
    title = StringField('Post title', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    image_url = StringField("Attach an image (optional)")
    community_id = IntegerField("Community", validators=[DataRequired()])
