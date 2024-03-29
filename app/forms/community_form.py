from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CommunityForm(FlaskForm):
    community_name = StringField('Community Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    image_url = StringField("Community Image", validators=[DataRequired()])
