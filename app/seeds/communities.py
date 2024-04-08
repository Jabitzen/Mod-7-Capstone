from app.models import db, Community, environment, SCHEMA
from sqlalchemy.sql import text

transformers = ["https://static.wikia.nocookie.net/michaelbaystransformers/images/5/57/Optimus_Prime.jpg",
                "https://static.wikia.nocookie.net/michaelbaystransformers/images/b/bb/Age_of_extinction_bumblebee_cgi_render.jpg",
                "https://static.wikia.nocookie.net/michaelbaystransformers/images/3/31/DOTMegatron.jpg",
                "https://static.wikia.nocookie.net/characterprofile/images/3/36/Starscream_rotf_promo_1_by_barricade24.png",
                "https://static.wikia.nocookie.net/michaelbaystransformers/images/7/79/C126ED1F-DED0-4FB9-95C5-88E956B7603B.jpeg"
                ]

# Adds a demo user, you can add other users here if you want
def seed_communities():

        demo1 = Community(owner_id=1,community_name="Optimus", description="This is Prime", image_url=transformers[0])
        db.session.add(demo1)
        demo2 = Community(owner_id=2,community_name="Bumblebee", description="This is Bumblebee", image_url=transformers[1])
        demo3 = Community(owner_id=1,community_name="Megatron", description="Decepticon Lead", image_url=transformers[2])
        demo4 = Community(owner_id=2,community_name="StarScream", description="Evil jet plane", image_url=transformers[3])
        demo5 = Community(owner_id=1,community_name="Barricade", description="Undercover Cop", image_url=transformers[4])
        db.session.add(demo2)
        db.session.add(demo3)
        db.session.add(demo4)
        db.session.add(demo5)
        db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities"))

    db.session.commit()
