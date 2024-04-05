from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

images = ["https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/12/transformers-4-optimus-prime-and-dinobot.jpg",
                "https://i.ebayimg.com/images/g/FzoAAOSwimJj-Rf9/s-l1200.webp",
                "https://www.looper.com/img/gallery/where-is-megatron-during-rise-of-the-beasts-and-why-his-absence-makes-sense/l-intro-1686153260.jpg",
                "https://www.seibertron.com/images/galleries/files/172/transformers-the-last-knight-barricade-005.jpg",
                "https://static.wikia.nocookie.net/michaelbaystransformers/images/6/69/StarscreamatHooverDam.jpg"
                ]

# Adds a demo user, you can add other users here if you want
def seed_posts():
    for num in range(5):
        post = Post(owner_id=2,title="This transformer is kinda crazy", description='This is post# {}'.format(num + 1), community_id=num+1, image_url=images[num])
        db.session.add(post)
        db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
