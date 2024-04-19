from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms import StringField, EmailField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Community

def community_name_exists(form, field):
    # Checking if user exists
    community_name = field.data
    community = Community.query.filter(Community.community_name == community_name).first()
    if community:
        raise ValidationError('This community name is taken.')

def name_length_valid(form, field):
    community_name = field.data
    if len(community_name) > 20:
        raise ValidationError('The community name must not be greater than 20 characters')

def description_length_valid(form, field):
    description = field.data
    if len(description) > 150:
        raise ValidationError('The description must not be greater than 150 characters')


class CommunityForm(FlaskForm):
    community_name = StringField('Community Name', validators=[DataRequired(), community_name_exists, name_length_valid])
    description = TextAreaField('Description', validators=[DataRequired(), description_length_valid])
    image_url = FileField("Community Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
