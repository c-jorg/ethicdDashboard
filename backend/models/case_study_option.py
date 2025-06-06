from .db import db, ma

class CaseStudyOption(db.Model):
    __tablename__ = "case_study_options"

    id = db.Column("case_study_option_id", db.Integer, primary_key=True)
    case_study_id = db.Column("case_study_id", db.Integer, db.ForeignKey("case_studies.case_study_id"))
    title = db.Column("title", db.String)
    description = db.Column("description", db.String)

    def __init__(self, case_study_id, title, description):
        self.case_study_id = case_study_id 
        self.title = title 
        self.description = description 

    def __repr__(self):
        return f"case_study_id: {self.case_study_id} title: {self.title} description: {self.description}"

    @classmethod 
    def get_case_study_id_by_id(cls, id):
        return db.session.query(cls).filter(cls.id == id).first().id

    @classmethod 
    def get_case_study_by_id(cls, id):
        return db.session.query(cls).filter(cls.id == id).first()
    
    @classmethod 
    def post_case_study_option(cls, case_study_id, title, description):
        case_study_option = cls(case_study_id, title, description)
        db.session.add(case_study_option)
        db.session.commit()

    @classmethod 
    def get_case_study_option_by_id(cls, id):
        return db.session.query(cls).filter(cls.id == id).first()
    
    @classmethod 
    def get_case_study_options_by_case_study_id(cls, case_study_id):
        return db.session.query(cls).filter(cls.case_study_id == case_study_id).all()
    
    @classmethod
    def delete_case_study_options_by_case_study_id(cls, case_study_id):
        db.session.query(cls).filter(cls.case_study_id == case_study_id).delete()
        db.session.commit()
        
    @classmethod
    def update_description(cls, id, description):
        option = db.session.query(cls).filter(cls.id == id).first()
        option.description = description
        db.session.commit()
        
    @classmethod
    def get_case_study_option_id_by_title_and_case_study_id(cls, title, case_study_id):
        print(f'case_study_option getting title {title} case study id {case_study_id}', flush=True)
        option = db.session.query(cls).filter(cls.case_study_id == case_study_id, cls.title == title).first()
        print(f'option {option}', flush=True)
        #option = option.first()
        #options = option.all()
        #print(f'options {option}', flush=True)
        return option.id if option else None

class CaseStudyOptionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CaseStudyOption
        session = db.session
        load_instance = True