from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms import StringField, IntegerField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def title_length_valid(form, field):
    title = field.data
    if len(title) > 20:
        raise ValidationError('The title must not be greater than 20 characters')

def description_length_valid(form, field):
    description = field.data
    if len(description) > 70:
        raise ValidationError('The description must not be greater than 70 characters')

class PostForm(FlaskForm):
    title = StringField('Post title', validators=[DataRequired(), title_length_valid])
    description = TextAreaField('Description', validators=[DataRequired(), description_length_valid])
    image_url = FileField("Attach an Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    community_id = IntegerField("Community", validators=[DataRequired()])
