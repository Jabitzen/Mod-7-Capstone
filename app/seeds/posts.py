from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

images = ["https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/12/transformers-4-optimus-prime-and-dinobot.jpg",
                "https://i.ebayimg.com/images/g/FzoAAOSwimJj-Rf9/s-l1200.webp",
                "https://www.looper.com/img/gallery/where-is-megatron-during-rise-of-the-beasts-and-why-his-absence-makes-sense/l-intro-1686153260.jpg",
                "https://static.wikia.nocookie.net/michaelbaystransformers/images/6/69/StarscreamatHooverDam.jpg",
                "https://www.seibertron.com/images/galleries/files/172/transformers-the-last-knight-barricade-005.jpg"
                ]

# Adds a demo user, you can add other users here if you want
def seed_posts():

        post1 = Post(owner_id=1,title="Optimus is So cool", description="He is the leader after all", community_id=1, image_url=images[0])
        post2 = Post(owner_id=2,title="Bumblebee is the best", description="His fights are great", community_id=2, image_url=images[1])
        post3 = Post(owner_id=1,title="Megatron is wicked", description="Awesome villain", community_id=3, image_url=images[2])
        post4 = Post(owner_id=2,title="Starscream looks weird", description="He looks kinda strange", community_id=4, image_url=images[3])
        post5 = Post(owner_id=1,title="Real life Barricade", description="Such a cool car", community_id=5, image_url=images[4])
        db.session.add(post1)
        db.session.add(post2)
        db.session.add(post3)
        db.session.add(post4)
        db.session.add(post5)
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
