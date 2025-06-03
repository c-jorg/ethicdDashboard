--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE ethics_dashboard;




--
-- Drop roles
--

DROP ROLE ethics_dashboard;


--
-- Roles
--

CREATE ROLE ethics_dashboard;
ALTER ROLE ethics_dashboard WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md57bbba00eae206814390a30db2f86edeb';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.21 (Debian 13.21-1.pgdg120+1)
-- Dumped by pg_dump version 13.21 (Debian 13.21-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: ethics_dashboard
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO ethics_dashboard;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: ethics_dashboard
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: ethics_dashboard
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: ethics_dashboard
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "ethics_dashboard" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.21 (Debian 13.21-1.pgdg120+1)
-- Dumped by pg_dump version 13.21 (Debian 13.21-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ethics_dashboard; Type: DATABASE; Schema: -; Owner: ethics_dashboard
--

CREATE DATABASE ethics_dashboard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE ethics_dashboard OWNER TO ethics_dashboard;

\connect ethics_dashboard

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.answers (
    answer_id integer NOT NULL,
    assignment_id integer,
    form_id integer,
    key character varying,
    value_string character varying,
    value_int integer,
    created timestamp without time zone,
    last_modified timestamp without time zone
);


ALTER TABLE public.answers OWNER TO ethics_dashboard;

--
-- Name: answers_answer_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.answers_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_answer_id_seq OWNER TO ethics_dashboard;

--
-- Name: answers_answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.answers_answer_id_seq OWNED BY public.answers.answer_id;


--
-- Name: assignments; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.assignments (
    assignment_id integer NOT NULL,
    student_id integer,
    case_study_id integer,
    case_study_option_id integer,
    submitted boolean,
    graded boolean,
    last_modified timestamp without time zone
);


ALTER TABLE public.assignments OWNER TO ethics_dashboard;

--
-- Name: assignments_assignment_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.assignments_assignment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assignments_assignment_id_seq OWNER TO ethics_dashboard;

--
-- Name: assignments_assignment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.assignments_assignment_id_seq OWNED BY public.assignments.assignment_id;


--
-- Name: case_studies; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.case_studies (
    case_study_id integer NOT NULL,
    prof_id integer,
    ta_id integer,
    class_id integer,
    title character varying,
    last_modified date
);


ALTER TABLE public.case_studies OWNER TO ethics_dashboard;

--
-- Name: case_studies_case_study_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.case_studies_case_study_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.case_studies_case_study_id_seq OWNER TO ethics_dashboard;

--
-- Name: case_studies_case_study_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.case_studies_case_study_id_seq OWNED BY public.case_studies.case_study_id;


--
-- Name: case_study_options; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.case_study_options (
    case_study_option_id integer NOT NULL,
    case_study_id integer,
    title character varying,
    description character varying
);


ALTER TABLE public.case_study_options OWNER TO ethics_dashboard;

--
-- Name: case_study_options_case_study_option_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.case_study_options_case_study_option_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.case_study_options_case_study_option_id_seq OWNER TO ethics_dashboard;

--
-- Name: case_study_options_case_study_option_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.case_study_options_case_study_option_id_seq OWNED BY public.case_study_options.case_study_option_id;


--
-- Name: classes; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.classes (
    class_id integer NOT NULL,
    class_name character varying,
    prof_id integer,
    class_code character varying
);


ALTER TABLE public.classes OWNER TO ethics_dashboard;

--
-- Name: classes_class_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.classes_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classes_class_id_seq OWNER TO ethics_dashboard;

--
-- Name: classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.classes_class_id_seq OWNED BY public.classes.class_id;


--
-- Name: dynamic_questions; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.dynamic_questions (
    dynamic_question_id integer NOT NULL,
    case_study_id integer,
    form_id integer,
    question_text character varying
);


ALTER TABLE public.dynamic_questions OWNER TO ethics_dashboard;

--
-- Name: dynamic_questions_dynamic_question_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.dynamic_questions_dynamic_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dynamic_questions_dynamic_question_id_seq OWNER TO ethics_dashboard;

--
-- Name: dynamic_questions_dynamic_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.dynamic_questions_dynamic_question_id_seq OWNED BY public.dynamic_questions.dynamic_question_id;


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.enrollments (
    enrollment_id integer NOT NULL,
    class_id integer,
    student_id integer
);


ALTER TABLE public.enrollments OWNER TO ethics_dashboard;

--
-- Name: enrollments_enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.enrollments_enrollment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrollments_enrollment_id_seq OWNER TO ethics_dashboard;

--
-- Name: enrollments_enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.enrollments_enrollment_id_seq OWNED BY public.enrollments.enrollment_id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.feedbacks (
    feedback_id integer NOT NULL,
    assignment_id integer,
    answer_id integer,
    form_id integer,
    section_key character varying,
    content character varying,
    last_modified date
);


ALTER TABLE public.feedbacks OWNER TO ethics_dashboard;

--
-- Name: feedbacks_feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.feedbacks_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedbacks_feedback_id_seq OWNER TO ethics_dashboard;

--
-- Name: feedbacks_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.feedbacks_feedback_id_seq OWNED BY public.feedbacks.feedback_id;


--
-- Name: form_descriptions; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.form_descriptions (
    form_description_id integer NOT NULL,
    case_study_id integer,
    form_id integer,
    description character varying
);


ALTER TABLE public.form_descriptions OWNER TO ethics_dashboard;

--
-- Name: form_descriptions_form_description_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.form_descriptions_form_description_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_descriptions_form_description_id_seq OWNER TO ethics_dashboard;

--
-- Name: form_descriptions_form_description_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.form_descriptions_form_description_id_seq OWNED BY public.form_descriptions.form_description_id;


--
-- Name: forms; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.forms (
    form_id integer NOT NULL,
    name character varying
);


ALTER TABLE public.forms OWNER TO ethics_dashboard;

--
-- Name: forms_form_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.forms_form_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forms_form_id_seq OWNER TO ethics_dashboard;

--
-- Name: forms_form_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.forms_form_id_seq OWNED BY public.forms.form_id;


--
-- Name: grades; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.grades (
    grade_id integer NOT NULL,
    grade integer,
    form_group character varying,
    assignment_id integer
);


ALTER TABLE public.grades OWNER TO ethics_dashboard;

--
-- Name: grades_grade_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.grades_grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grades_grade_id_seq OWNER TO ethics_dashboard;

--
-- Name: grades_grade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.grades_grade_id_seq OWNED BY public.grades.grade_id;


--
-- Name: professors; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.professors (
    prof_id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying
);


ALTER TABLE public.professors OWNER TO ethics_dashboard;

--
-- Name: professors_prof_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.professors_prof_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.professors_prof_id_seq OWNER TO ethics_dashboard;

--
-- Name: professors_prof_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.professors_prof_id_seq OWNED BY public.professors.prof_id;


--
-- Name: slider_questions; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.slider_questions (
    slider_question_id integer NOT NULL,
    case_study_id integer,
    form_id integer,
    question_text character varying,
    left_label character varying,
    right_label character varying
);


ALTER TABLE public.slider_questions OWNER TO ethics_dashboard;

--
-- Name: slider_questions_slider_question_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.slider_questions_slider_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.slider_questions_slider_question_id_seq OWNER TO ethics_dashboard;

--
-- Name: slider_questions_slider_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.slider_questions_slider_question_id_seq OWNED BY public.slider_questions.slider_question_id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.students (
    student_id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying,
    guest boolean,
    consented boolean,
    deleted boolean
);


ALTER TABLE public.students OWNER TO ethics_dashboard;

--
-- Name: students_student_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_student_id_seq OWNER TO ethics_dashboard;

--
-- Name: students_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.student_id;


--
-- Name: submissions; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.submissions (
    submission_id integer NOT NULL,
    assignment_id integer,
    student_id integer,
    form_id integer,
    submitted_time timestamp without time zone
);


ALTER TABLE public.submissions OWNER TO ethics_dashboard;

--
-- Name: submissions_submission_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.submissions_submission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.submissions_submission_id_seq OWNER TO ethics_dashboard;

--
-- Name: submissions_submission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.submissions_submission_id_seq OWNED BY public.submissions.submission_id;


--
-- Name: tas; Type: TABLE; Schema: public; Owner: ethics_dashboard
--

CREATE TABLE public.tas (
    ta_id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying
);


ALTER TABLE public.tas OWNER TO ethics_dashboard;

--
-- Name: tas_ta_id_seq; Type: SEQUENCE; Schema: public; Owner: ethics_dashboard
--

CREATE SEQUENCE public.tas_ta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tas_ta_id_seq OWNER TO ethics_dashboard;

--
-- Name: tas_ta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ethics_dashboard
--

ALTER SEQUENCE public.tas_ta_id_seq OWNED BY public.tas.ta_id;


--
-- Name: answers answer_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.answers ALTER COLUMN answer_id SET DEFAULT nextval('public.answers_answer_id_seq'::regclass);


--
-- Name: assignments assignment_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.assignments ALTER COLUMN assignment_id SET DEFAULT nextval('public.assignments_assignment_id_seq'::regclass);


--
-- Name: case_studies case_study_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_studies ALTER COLUMN case_study_id SET DEFAULT nextval('public.case_studies_case_study_id_seq'::regclass);


--
-- Name: case_study_options case_study_option_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_study_options ALTER COLUMN case_study_option_id SET DEFAULT nextval('public.case_study_options_case_study_option_id_seq'::regclass);


--
-- Name: classes class_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.classes ALTER COLUMN class_id SET DEFAULT nextval('public.classes_class_id_seq'::regclass);


--
-- Name: dynamic_questions dynamic_question_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.dynamic_questions ALTER COLUMN dynamic_question_id SET DEFAULT nextval('public.dynamic_questions_dynamic_question_id_seq'::regclass);


--
-- Name: enrollments enrollment_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN enrollment_id SET DEFAULT nextval('public.enrollments_enrollment_id_seq'::regclass);


--
-- Name: feedbacks feedback_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN feedback_id SET DEFAULT nextval('public.feedbacks_feedback_id_seq'::regclass);


--
-- Name: form_descriptions form_description_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.form_descriptions ALTER COLUMN form_description_id SET DEFAULT nextval('public.form_descriptions_form_description_id_seq'::regclass);


--
-- Name: forms form_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.forms ALTER COLUMN form_id SET DEFAULT nextval('public.forms_form_id_seq'::regclass);


--
-- Name: grades grade_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.grades ALTER COLUMN grade_id SET DEFAULT nextval('public.grades_grade_id_seq'::regclass);


--
-- Name: professors prof_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.professors ALTER COLUMN prof_id SET DEFAULT nextval('public.professors_prof_id_seq'::regclass);


--
-- Name: slider_questions slider_question_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.slider_questions ALTER COLUMN slider_question_id SET DEFAULT nextval('public.slider_questions_slider_question_id_seq'::regclass);


--
-- Name: students student_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.students ALTER COLUMN student_id SET DEFAULT nextval('public.students_student_id_seq'::regclass);


--
-- Name: submissions submission_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.submissions ALTER COLUMN submission_id SET DEFAULT nextval('public.submissions_submission_id_seq'::regclass);


--
-- Name: tas ta_id; Type: DEFAULT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.tas ALTER COLUMN ta_id SET DEFAULT nextval('public.tas_ta_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.answers (answer_id, assignment_id, form_id, key, value_string, value_int, created, last_modified) FROM stdin;
108	10	1	dilemma-0	conflict_of_interest	\N	2025-05-16 19:23:18.465547	2025-05-16 19:23:18.465553
109	9	1	dilemma-0	conflict_of_interest	\N	2025-05-16 19:23:18.47081	2025-05-16 19:23:18.470816
110	10	1	dilemma-1	false	\N	2025-05-16 19:23:18.473683	2025-05-16 19:23:18.473688
111	9	1	dilemma-1	false	\N	2025-05-16 19:23:18.476353	2025-05-16 19:23:18.476357
112	10	1	dilemma-2	false	\N	2025-05-16 19:23:18.480845	2025-05-16 19:23:18.480849
113	9	1	dilemma-2	false	\N	2025-05-16 19:23:18.484677	2025-05-16 19:23:18.48468
114	10	1	state-the-problem	The problem exists	\N	2025-05-16 19:23:18.48725	2025-05-16 19:23:18.487255
115	9	1	state-the-problem	The problem exists	\N	2025-05-16 19:23:18.48982	2025-05-16 19:23:18.489824
116	10	1	gather-facts-1	because reasons	\N	2025-05-16 19:23:18.492297	2025-05-16 19:23:18.4923
117	9	1	gather-facts-1	because reasons	\N	2025-05-16 19:23:18.496283	2025-05-16 19:23:18.496288
118	10	1	gather-facts-2	earth	\N	2025-05-16 19:23:18.498942	2025-05-16 19:23:18.498947
119	9	1	gather-facts-2	earth	\N	2025-05-16 19:23:18.501399	2025-05-16 19:23:18.501403
120	10	1	gather-facts-3	yesterday	\N	2025-05-16 19:23:18.504687	2025-05-16 19:23:18.504693
121	9	1	gather-facts-3	yesterday	\N	2025-05-16 19:23:18.507525	2025-05-16 19:23:18.507531
122	10	1	stakeholder-name-0	Bob	\N	2025-05-16 19:23:18.511899	2025-05-16 19:23:18.511905
123	9	1	stakeholder-name-0	Bob	\N	2025-05-16 19:23:18.514435	2025-05-16 19:23:18.514439
124	10	1	stakeholder-directly-0	directly	\N	2025-05-16 19:23:18.516903	2025-05-16 19:23:18.516906
125	9	1	stakeholder-directly-0	directly	\N	2025-05-16 19:23:18.519401	2025-05-16 19:23:18.519405
126	10	1	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:18.521768	2025-05-16 19:23:18.521771
127	9	1	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:18.524137	2025-05-16 19:23:18.52414
128	10	1	stakeholder-name-1	Jim	\N	2025-05-16 19:23:18.526961	2025-05-16 19:23:18.526965
129	9	1	stakeholder-name-1	Jim	\N	2025-05-16 19:23:18.530129	2025-05-16 19:23:18.530132
130	10	1	stakeholder-directly-1	directly	\N	2025-05-16 19:23:18.532689	2025-05-16 19:23:18.532693
131	9	1	stakeholder-directly-1	directly	\N	2025-05-16 19:23:18.535821	2025-05-16 19:23:18.535824
132	10	1	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:18.539476	2025-05-16 19:23:18.539481
133	9	1	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:18.542669	2025-05-16 19:23:18.542673
134	10	1	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:18.54559	2025-05-16 19:23:18.545594
135	9	1	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:18.549736	2025-05-16 19:23:18.54974
136	10	1	stakeholder-directly-2	false	\N	2025-05-16 19:23:18.552934	2025-05-16 19:23:18.552937
137	9	1	stakeholder-directly-2	false	\N	2025-05-16 19:23:18.55754	2025-05-16 19:23:18.557543
138	10	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:18.560833	2025-05-16 19:23:18.560837
139	9	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:18.565157	2025-05-16 19:23:18.56516
140	10	1	stakeholder-directly-4	false	\N	2025-05-16 19:23:18.567774	2025-05-16 19:23:18.567777
141	9	1	stakeholder-directly-4	false	\N	2025-05-16 19:23:18.570694	2025-05-16 19:23:18.570698
142	10	1	stakeholder-name-6	Charles	\N	2025-05-16 19:23:18.574201	2025-05-16 19:23:18.574204
143	9	1	stakeholder-name-6	Charles	\N	2025-05-16 19:23:18.576748	2025-05-16 19:23:18.576751
144	10	1	option-title-1	Do a little	\N	2025-05-16 19:23:18.579495	2025-05-16 19:23:18.579498
145	9	1	option-title-1	Do a little	\N	2025-05-16 19:23:18.584349	2025-05-16 19:23:18.584352
146	10	1	option-description-3	get some help	\N	2025-05-16 19:23:18.588778	2025-05-16 19:23:18.588782
147	9	1	option-description-3	get some help	\N	2025-05-16 19:23:18.593061	2025-05-16 19:23:18.593065
148	10	1	publicity-yes-0	yes	\N	2025-05-16 19:23:18.59672	2025-05-16 19:23:18.596723
149	9	1	publicity-yes-0	yes	\N	2025-05-16 19:23:18.600312	2025-05-16 19:23:18.600315
150	10	1	harm-no-1	false	\N	2025-05-16 19:23:18.603668	2025-05-16 19:23:18.603671
151	9	1	harm-no-1	false	\N	2025-05-16 19:23:18.60721	2025-05-16 19:23:18.607215
152	10	1	harm-yes-2	yes	\N	2025-05-16 19:23:18.610254	2025-05-16 19:23:18.610259
153	9	1	harm-yes-2	yes	\N	2025-05-16 19:23:18.615402	2025-05-16 19:23:18.615408
154	10	1	reversible-no-2	no	\N	2025-05-16 19:23:18.618065	2025-05-16 19:23:18.618068
155	9	1	reversible-no-2	no	\N	2025-05-16 19:23:18.620827	2025-05-16 19:23:18.620831
156	10	1	reversible-yes-3	false	\N	2025-05-16 19:23:18.623367	2025-05-16 19:23:18.623371
157	9	1	reversible-yes-3	false	\N	2025-05-16 19:23:18.6259	2025-05-16 19:23:18.625903
158	10	1	publicity-no-4	false	\N	2025-05-16 19:23:18.628347	2025-05-16 19:23:18.62835
159	9	1	publicity-no-4	false	\N	2025-05-16 19:23:18.630733	2025-05-16 19:23:18.630736
160	10	1	tentative-choice-2	false	\N	2025-05-16 19:23:18.633228	2025-05-16 19:23:18.633231
161	9	1	tentative-choice-2	false	\N	2025-05-16 19:23:18.635564	2025-05-16 19:23:18.635567
162	10	1	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:18.638029	2025-05-16 19:23:18.638033
163	9	1	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:18.640282	2025-05-16 19:23:18.640285
164	10	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:18.642642	2025-05-16 19:23:18.642645
165	9	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:18.645022	2025-05-16 19:23:18.645025
166	10	1	stakeholder-directly-6	directly	\N	2025-05-16 19:23:18.647321	2025-05-16 19:23:18.647324
167	9	1	stakeholder-directly-6	directly	\N	2025-05-16 19:23:18.649641	2025-05-16 19:23:18.649644
168	10	1	option-description-1	Do a little	\N	2025-05-16 19:23:18.651966	2025-05-16 19:23:18.65197
169	9	1	option-description-1	Do a little	\N	2025-05-16 19:23:18.654331	2025-05-16 19:23:18.654334
170	10	1	option-title-4	Pay for help	\N	2025-05-16 19:23:18.656699	2025-05-16 19:23:18.656702
171	9	1	option-title-4	Pay for help	\N	2025-05-16 19:23:18.659316	2025-05-16 19:23:18.65932
172	10	1	publicity-no-0	false	\N	2025-05-16 19:23:18.663342	2025-05-16 19:23:18.663346
173	9	1	publicity-no-0	false	\N	2025-05-16 19:23:18.665826	2025-05-16 19:23:18.66583
174	10	1	publicity-yes-1	yes	\N	2025-05-16 19:23:18.668523	2025-05-16 19:23:18.668526
175	9	1	publicity-yes-1	yes	\N	2025-05-16 19:23:18.671977	2025-05-16 19:23:18.67198
176	10	1	harm-no-2	false	\N	2025-05-16 19:23:18.674322	2025-05-16 19:23:18.674325
177	9	1	harm-no-2	false	\N	2025-05-16 19:23:18.67669	2025-05-16 19:23:18.676693
178	10	1	harm-yes-3	false	\N	2025-05-16 19:23:18.678997	2025-05-16 19:23:18.679001
179	9	1	harm-yes-3	false	\N	2025-05-16 19:23:18.681376	2025-05-16 19:23:18.681379
180	10	1	reversible-no-3	no	\N	2025-05-16 19:23:18.68391	2025-05-16 19:23:18.683913
181	9	1	reversible-no-3	no	\N	2025-05-16 19:23:18.686357	2025-05-16 19:23:18.686361
182	10	1	reversible-yes-4	yes	\N	2025-05-16 19:23:18.68888	2025-05-16 19:23:18.688883
183	9	1	reversible-yes-4	yes	\N	2025-05-16 19:23:18.691266	2025-05-16 19:23:18.69127
184	10	1	tentative-choice-3	Get help	\N	2025-05-16 19:23:18.693636	2025-05-16 19:23:18.693639
185	9	1	tentative-choice-3	Get help	\N	2025-05-16 19:23:18.696042	2025-05-16 19:23:18.696045
186	10	1	stakeholder-directly-3	directly	\N	2025-05-16 19:23:18.698359	2025-05-16 19:23:18.698363
187	9	1	stakeholder-directly-3	directly	\N	2025-05-16 19:23:18.700752	2025-05-16 19:23:18.700755
188	10	1	stakeholder-name-5	Carol	\N	2025-05-16 19:23:18.703156	2025-05-16 19:23:18.70316
189	9	1	stakeholder-name-5	Carol	\N	2025-05-16 19:23:18.705532	2025-05-16 19:23:18.705536
190	10	1	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:18.708402	2025-05-16 19:23:18.708406
191	9	1	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:18.711612	2025-05-16 19:23:18.711617
192	10	1	option-title-2	Do lots 	\N	2025-05-16 19:23:18.714257	2025-05-16 19:23:18.714261
193	9	1	option-title-2	Do lots 	\N	2025-05-16 19:23:18.716634	2025-05-16 19:23:18.716638
194	10	1	option-description-4	pay for some help	\N	2025-05-16 19:23:18.719034	2025-05-16 19:23:18.719037
195	9	1	option-description-4	pay for some help	\N	2025-05-16 19:23:18.721378	2025-05-16 19:23:18.721382
196	10	1	reversible-yes-0	yes	\N	2025-05-16 19:23:18.723899	2025-05-16 19:23:18.723903
197	9	1	reversible-yes-0	yes	\N	2025-05-16 19:23:18.727847	2025-05-16 19:23:18.727851
198	10	1	publicity-no-1	false	\N	2025-05-16 19:23:18.731945	2025-05-16 19:23:18.731949
203	9	1	harm-no-3	no	\N	2025-05-16 19:23:18.752116	2025-05-16 19:23:18.75212
208	10	1	tentative-choice-4	false	\N	2025-05-16 19:23:18.767555	2025-05-16 19:23:18.767559
213	9	1	stakeholder-directly-5	false	\N	2025-05-16 19:23:18.78298	2025-05-16 19:23:18.782984
218	10	1	harm-yes-0	yes	\N	2025-05-16 19:23:18.795571	2025-05-16 19:23:18.795575
223	9	1	reversible-yes-1	yes	\N	2025-05-16 19:23:18.808205	2025-05-16 19:23:18.808209
228	10	1	harm-no-4	no	\N	2025-05-16 19:23:18.820224	2025-05-16 19:23:18.820228
233	9	1	num_stakeholders	7	\N	2025-05-16 19:23:18.832826	2025-05-16 19:23:18.83283
238	10	1	option-description-0	Do nothing	\N	2025-05-16 19:23:18.845296	2025-05-16 19:23:18.845299
243	9	1	harm-no-0	false	\N	2025-05-16 19:23:18.857958	2025-05-16 19:23:18.857962
248	10	1	reversible-yes-2	false	\N	2025-05-16 19:23:18.870314	2025-05-16 19:23:18.870317
253	9	1	publicity-yes-4	yes	\N	2025-05-16 19:23:18.883262	2025-05-16 19:23:18.883265
256	9	10	stakeholder-name-0	Bob	\N	2025-05-16 19:23:18.904087	2025-05-16 19:23:18.904094
261	9	10	responsiveness-0	7	\N	2025-05-16 19:23:18.924676	2025-05-16 19:23:18.924681
266	9	10	competence-1	7	\N	2025-05-16 19:23:18.944186	2025-05-16 19:23:18.944191
271	9	10	attentiveness-2	5	\N	2025-05-16 19:23:18.960124	2025-05-16 19:23:18.960128
276	9	10	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:18.973448	2025-05-16 19:23:18.973452
281	9	10	competence-4	2	\N	2025-05-16 19:23:18.989473	2025-05-16 19:23:18.989478
286	9	10	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:19.010541	2025-05-16 19:23:19.010546
291	9	10	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:19.025332	2025-05-16 19:23:19.025335
296	9	10	cumulative-score	6	\N	2025-05-16 19:23:19.038316	2025-05-16 19:23:19.038321
301	9	10	responsiveness-6	7	\N	2025-05-16 19:23:19.051617	2025-05-16 19:23:19.05162
306	9	5	primary-virtue-never	be dishonest	\N	2025-05-16 19:23:19.064719	2025-05-16 19:23:19.064722
311	10	5	universalizability-fail	fail	\N	2025-05-16 19:23:19.076931	2025-05-16 19:23:19.076934
316	9	2	inverse-short-term-0	1	\N	2025-05-16 19:23:19.090226	2025-05-16 19:23:19.090231
321	10	2	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:19.103044	2025-05-16 19:23:19.103047
326	9	2	stakeholder-directly-4	false	\N	2025-05-16 19:23:19.115112	2025-05-16 19:23:19.115115
331	10	2	inverse-short-term-5	1	\N	2025-05-16 19:23:19.127436	2025-05-16 19:23:19.12744
336	9	2	topic-2	yes	\N	2025-05-16 19:23:19.14628	2025-05-16 19:23:19.146284
341	10	2	long-term-0	4	\N	2025-05-16 19:23:19.163238	2025-05-16 19:23:19.163243
346	9	2	inverse-long-term-2	4	\N	2025-05-16 19:23:19.176699	2025-05-16 19:23:19.176703
351	10	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:19.194293	2025-05-16 19:23:19.194297
356	9	2	short-term-6	1	\N	2025-05-16 19:23:19.211455	2025-05-16 19:23:19.211461
361	10	2	topic-3	unreliable	\N	2025-05-16 19:23:19.224283	2025-05-16 19:23:19.224287
366	9	2	inverse-short-term-1	1	\N	2025-05-16 19:23:19.240894	2025-05-16 19:23:19.240898
371	10	2	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:19.254318	2025-05-16 19:23:19.254322
376	9	2	stakeholder-directly-5	false	\N	2025-05-16 19:23:19.267241	2025-05-16 19:23:19.267245
381	10	2	inverse-short-term-6	4	\N	2025-05-16 19:23:19.280243	2025-05-16 19:23:19.280248
386	9	2	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:19.293146	2025-05-16 19:23:19.293149
391	10	2	long-term-1	4	\N	2025-05-16 19:23:19.311143	2025-05-16 19:23:19.311147
396	9	2	inverse-long-term-3	1	\N	2025-05-16 19:23:19.328543	2025-05-16 19:23:19.328547
401	10	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:19.342555	2025-05-16 19:23:19.342561
406	9	2	ranked-long-term	35.71	\N	2025-05-16 19:23:19.356511	2025-05-16 19:23:19.356517
411	10	2	short-term-0	4	\N	2025-05-16 19:23:19.376319	2025-05-16 19:23:19.376323
416	9	2	inverse-short-term-2	4	\N	2025-05-16 19:23:19.3979	2025-05-16 19:23:19.397906
421	10	2	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:19.416416	2025-05-16 19:23:19.41642
426	9	2	stakeholder-directly-6	directly	\N	2025-05-16 19:23:19.431709	2025-05-16 19:23:19.431714
431	10	2	topic-1	bad	\N	2025-05-16 19:23:19.445941	2025-05-16 19:23:19.445945
436	9	3	pain-1	8	\N	2025-05-16 19:23:19.463883	2025-05-16 19:23:19.463887
441	10	3	pain-2	8	\N	2025-05-16 19:23:19.482916	2025-05-16 19:23:19.482921
446	9	3	pleasure-3	2	\N	2025-05-16 19:23:19.497698	2025-05-16 19:23:19.497703
451	10	3	pain-5	8	\N	2025-05-16 19:23:19.514483	2025-05-16 19:23:19.514488
456	9	3	total-pleasure	175	\N	2025-05-16 19:23:19.528641	2025-05-16 19:23:19.528646
461	10	3	pleasure-pain-ratio	73	\N	2025-05-16 19:23:19.547699	2025-05-16 19:23:19.547704
466	9	4	mill-pleasure-0	1	\N	2025-05-16 19:23:19.568152	2025-05-16 19:23:19.568157
471	10	4	mill-pleasure-1	2	\N	2025-05-16 19:23:19.5844	2025-05-16 19:23:19.584404
476	9	4	mill-pain-3	7	\N	2025-05-16 19:23:19.598082	2025-05-16 19:23:19.598085
481	10	4	mill-pleasure-4	2	\N	2025-05-16 19:23:19.611453	2025-05-16 19:23:19.611456
486	9	4	mill-pleasure-6	6	\N	2025-05-16 19:23:19.626445	2025-05-16 19:23:19.62645
491	10	4	mill-total-pleasure	84	\N	2025-05-16 19:23:19.644184	2025-05-16 19:23:19.644188
496	9	4	cumulative-score	0	\N	2025-05-16 19:23:19.664161	2025-05-16 19:23:19.664165
501	9	8	fidelity-slider-1	7	\N	2025-05-16 19:23:19.687567	2025-05-16 19:23:19.68757
506	9	8	gratitude-slider-2	7	\N	2025-05-16 19:23:19.706461	2025-05-16 19:23:19.706464
511	9	12	slider-0	2	\N	2025-05-16 19:23:19.728813	2025-05-16 19:23:19.728833
516	9	12	topic-sg-2	no and no	\N	2025-05-16 19:23:19.747522	2025-05-16 19:23:19.747526
521	9	11	sexism-1	5	\N	2025-05-16 19:23:19.763015	2025-05-16 19:23:19.763019
526	9	11	stakeholder-name-5	Carol	\N	2025-05-16 19:23:19.779056	2025-05-16 19:23:19.77906
531	9	11	ageism-0	15	\N	2025-05-16 19:23:19.793727	2025-05-16 19:23:19.793731
536	9	11	sexism-4	5	\N	2025-05-16 19:23:19.812195	2025-05-16 19:23:19.812199
541	9	11	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:19.830186	2025-05-16 19:23:19.830189
546	9	11	ageism-3	5	\N	2025-05-16 19:23:19.843541	2025-05-16 19:23:19.843547
551	9	11	cumulative-score	5	\N	2025-05-16 19:23:19.864447	2025-05-16 19:23:19.864451
556	9	11	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:19.883763	2025-05-16 19:23:19.883767
561	9	11	ageism-6	15	\N	2025-05-16 19:23:19.896431	2025-05-16 19:23:19.896434
566	9	11	ableism-2	4	\N	2025-05-16 19:23:19.909063	2025-05-16 19:23:19.909066
571	9	11	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:19.922018	2025-05-16 19:23:19.922022
576	9	14	response-1-lp	wrong	\N	2025-05-16 19:23:19.936245	2025-05-16 19:23:19.936249
581	9	14	num-sliders-lp	3	\N	2025-05-16 19:23:19.951192	2025-05-16 19:23:19.951195
586	9	7	slider-2	10	\N	2025-05-16 19:23:19.964377	2025-05-16 19:23:19.96438
591	9	7	cumulative-score	5	\N	2025-05-16 19:23:19.977642	2025-05-16 19:23:19.977645
596	9	15	slider-society-responsibility-value	7	\N	2025-05-16 19:23:19.991596	2025-05-16 19:23:19.991599
601	9	15	slider-environmental-stewardship	8	\N	2025-05-16 19:23:20.004483	2025-05-16 19:23:20.004486
606	9	15	cumulative-score	-3	\N	2025-05-16 19:23:20.021848	2025-05-16 19:23:20.021858
611	9	13	domain-3	thing 3	\N	2025-05-16 19:23:20.03792	2025-05-16 19:23:20.037924
616	9	13	vice-5	17	\N	2025-05-16 19:23:20.051149	2025-05-16 19:23:20.051153
621	9	13	cumulative-score	5	\N	2025-05-16 19:23:20.064376	2025-05-16 19:23:20.06438
623	14	1	dilemma-0	conflict_of_interest	\N	2025-05-16 19:23:31.823732	2025-05-16 19:23:31.823736
628	15	1	state-the-problem	The problem exists	\N	2025-05-16 19:23:31.837577	2025-05-16 19:23:31.837581
633	14	1	gather-facts-2	earth	\N	2025-05-16 19:23:31.851952	2025-05-16 19:23:31.851957
638	15	1	stakeholder-directly-0	directly	\N	2025-05-16 19:23:31.865873	2025-05-16 19:23:31.865877
643	14	1	stakeholder-name-1	Jim	\N	2025-05-16 19:23:31.879673	2025-05-16 19:23:31.879678
648	15	1	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:31.893889	2025-05-16 19:23:31.893893
653	14	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:31.90752	2025-05-16 19:23:31.907525
658	15	1	option-title-1	Do a little	\N	2025-05-16 19:23:31.922844	2025-05-16 19:23:31.922849
663	14	1	publicity-yes-0	yes	\N	2025-05-16 19:23:31.940487	2025-05-16 19:23:31.94049
668	15	1	reversible-no-2	no	\N	2025-05-16 19:23:31.954212	2025-05-16 19:23:31.954216
673	14	1	publicity-no-4	false	\N	2025-05-16 19:23:31.968291	2025-05-16 19:23:31.968295
678	15	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:31.986319	2025-05-16 19:23:31.986326
683	14	1	option-description-1	Do a little	\N	2025-05-16 19:23:32.003409	2025-05-16 19:23:32.003415
688	15	1	publicity-yes-1	yes	\N	2025-05-16 19:23:32.030229	2025-05-16 19:23:32.030236
693	14	1	harm-yes-3	false	\N	2025-05-16 19:23:32.045141	2025-05-16 19:23:32.045146
199	9	1	publicity-no-1	false	\N	2025-05-16 19:23:18.735419	2025-05-16 19:23:18.735423
204	10	1	harm-yes-4	false	\N	2025-05-16 19:23:18.754611	2025-05-16 19:23:18.754615
209	9	1	tentative-choice-4	false	\N	2025-05-16 19:23:18.773029	2025-05-16 19:23:18.773034
214	10	1	option-title-0	Do nothing	\N	2025-05-16 19:23:18.785522	2025-05-16 19:23:18.785526
219	9	1	harm-yes-0	yes	\N	2025-05-16 19:23:18.79811	2025-05-16 19:23:18.798114
224	10	1	publicity-no-2	false	\N	2025-05-16 19:23:18.810696	2025-05-16 19:23:18.8107
229	9	1	harm-no-4	no	\N	2025-05-16 19:23:18.822782	2025-05-16 19:23:18.822786
234	10	1	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:18.835407	2025-05-16 19:23:18.835411
239	9	1	option-description-0	Do nothing	\N	2025-05-16 19:23:18.847785	2025-05-16 19:23:18.847788
244	10	1	harm-yes-1	yes	\N	2025-05-16 19:23:18.860444	2025-05-16 19:23:18.860448
249	9	1	reversible-yes-2	false	\N	2025-05-16 19:23:18.872878	2025-05-16 19:23:18.872882
254	10	1	tentative-choice-1	false	\N	2025-05-16 19:23:18.88598	2025-05-16 19:23:18.885983
257	9	10	stakeholder-directly-0	directly	\N	2025-05-16 19:23:18.910613	2025-05-16 19:23:18.91062
262	9	10	stakeholder-name-1	Jim	\N	2025-05-16 19:23:18.92747	2025-05-16 19:23:18.927474
267	9	10	responsiveness-1	2	\N	2025-05-16 19:23:18.948057	2025-05-16 19:23:18.948061
272	9	10	competence-2	8	\N	2025-05-16 19:23:18.96285	2025-05-16 19:23:18.962854
277	9	10	stakeholder-directly-6	directly	\N	2025-05-16 19:23:18.975999	2025-05-16 19:23:18.976003
282	9	10	attentiveness-5	9	\N	2025-05-16 19:23:18.9922	2025-05-16 19:23:18.992204
287	9	10	responsiveness-4	0	\N	2025-05-16 19:23:19.013344	2025-05-16 19:23:19.013348
292	9	10	stakeholder-directly-4	false	\N	2025-05-16 19:23:19.028339	2025-05-16 19:23:19.028343
297	9	10	attentiveness-3	6	\N	2025-05-16 19:23:19.041338	2025-05-16 19:23:19.041342
302	9	5	moral-virtues	Honesty	\N	2025-05-16 19:23:19.055031	2025-05-16 19:23:19.055035
307	10	5	primary-virtue-never	be dishonest	\N	2025-05-16 19:23:19.067081	2025-05-16 19:23:19.067084
312	9	5	consistency-pass	pass	\N	2025-05-16 19:23:19.079457	2025-05-16 19:23:19.07946
317	10	2	inverse-short-term-0	1	\N	2025-05-16 19:23:19.093101	2025-05-16 19:23:19.093105
322	9	2	long-term-2	1	\N	2025-05-16 19:23:19.105472	2025-05-16 19:23:19.105475
327	10	2	stakeholder-directly-4	false	\N	2025-05-16 19:23:19.117556	2025-05-16 19:23:19.11756
332	9	2	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:19.130012	2025-05-16 19:23:19.130016
337	10	2	topic-2	yes	\N	2025-05-16 19:23:19.149366	2025-05-16 19:23:19.14937
342	9	2	short-term-1	4	\N	2025-05-16 19:23:19.166012	2025-05-16 19:23:19.166016
347	10	2	inverse-long-term-2	4	\N	2025-05-16 19:23:19.179417	2025-05-16 19:23:19.179421
352	9	2	stakeholder-name-5	Carol	\N	2025-05-16 19:23:19.19698	2025-05-16 19:23:19.196984
357	10	2	short-term-6	1	\N	2025-05-16 19:23:19.214251	2025-05-16 19:23:19.214255
362	9	2	stakeholder-directly-0	directly	\N	2025-05-16 19:23:19.227074	2025-05-16 19:23:19.227078
367	10	2	inverse-short-term-1	1	\N	2025-05-16 19:23:19.243376	2025-05-16 19:23:19.243379
372	9	2	long-term-3	4	\N	2025-05-16 19:23:19.256936	2025-05-16 19:23:19.25694
377	10	2	stakeholder-directly-5	false	\N	2025-05-16 19:23:19.269733	2025-05-16 19:23:19.269736
382	9	2	ranked-short-term	39.29	\N	2025-05-16 19:23:19.282839	2025-05-16 19:23:19.282843
387	10	2	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:19.297792	2025-05-16 19:23:19.297809
392	9	2	short-term-2	1	\N	2025-05-16 19:23:19.316888	2025-05-16 19:23:19.316893
397	10	2	inverse-long-term-3	1	\N	2025-05-16 19:23:19.331339	2025-05-16 19:23:19.331343
402	9	2	stakeholder-name-6	Charles	\N	2025-05-16 19:23:19.345296	2025-05-16 19:23:19.3453
407	10	2	ranked-long-term	35.71	\N	2025-05-16 19:23:19.364257	2025-05-16 19:23:19.364264
412	9	2	stakeholder-directly-1	directly	\N	2025-05-16 19:23:19.382676	2025-05-16 19:23:19.382681
417	10	2	inverse-short-term-2	4	\N	2025-05-16 19:23:19.402749	2025-05-16 19:23:19.402753
422	9	2	long-term-4	1	\N	2025-05-16 19:23:19.419561	2025-05-16 19:23:19.419565
427	10	2	stakeholder-directly-6	directly	\N	2025-05-16 19:23:19.434375	2025-05-16 19:23:19.43438
432	9	3	pain-0	7	\N	2025-05-16 19:23:19.452251	2025-05-16 19:23:19.452256
437	10	3	pain-1	8	\N	2025-05-16 19:23:19.469316	2025-05-16 19:23:19.469322
442	9	3	pleasure-2	1	\N	2025-05-16 19:23:19.485982	2025-05-16 19:23:19.485987
447	10	3	pleasure-3	2	\N	2025-05-16 19:23:19.500608	2025-05-16 19:23:19.500613
452	9	3	pain-6	2	\N	2025-05-16 19:23:19.517253	2025-05-16 19:23:19.517258
457	10	3	total-pleasure	175	\N	2025-05-16 19:23:19.532155	2025-05-16 19:23:19.532161
462	9	3	cumulative-score	10	\N	2025-05-16 19:23:19.554281	2025-05-16 19:23:19.554288
467	10	4	mill-pleasure-0	1	\N	2025-05-16 19:23:19.573387	2025-05-16 19:23:19.573393
472	9	4	mill-pain-2	7	\N	2025-05-16 19:23:19.58731	2025-05-16 19:23:19.587314
477	10	4	mill-pain-3	7	\N	2025-05-16 19:23:19.600716	2025-05-16 19:23:19.60072
482	9	4	mill-pain-5	2	\N	2025-05-16 19:23:19.613956	2025-05-16 19:23:19.61396
487	10	4	mill-pleasure-6	6	\N	2025-05-16 19:23:19.629211	2025-05-16 19:23:19.629216
492	9	4	mill-total-pain	176	\N	2025-05-16 19:23:19.647011	2025-05-16 19:23:19.647015
497	10	4	cumulative-score	0	\N	2025-05-16 19:23:19.671889	2025-05-16 19:23:19.671894
502	9	8	fidelity-slider-2	2	\N	2025-05-16 19:23:19.694529	2025-05-16 19:23:19.694534
507	9	8	topic-1-dva	Not really	\N	2025-05-16 19:23:19.709264	2025-05-16 19:23:19.709268
512	9	12	slider-1	2	\N	2025-05-16 19:23:19.733792	2025-05-16 19:23:19.733811
517	9	12	num-sliders	3	\N	2025-05-16 19:23:19.750349	2025-05-16 19:23:19.750354
522	9	11	stakeholder-directly-2	false	\N	2025-05-16 19:23:19.765536	2025-05-16 19:23:19.765539
527	9	11	ableism-5	5	\N	2025-05-16 19:23:19.781691	2025-05-16 19:23:19.781695
532	9	11	racism-1	5	\N	2025-05-16 19:23:19.796575	2025-05-16 19:23:19.796579
537	9	11	stakeholder-directly-5	false	\N	2025-05-16 19:23:19.815126	2025-05-16 19:23:19.815131
542	9	11	stakeholder-name-1	Jim	\N	2025-05-16 19:23:19.83285	2025-05-16 19:23:19.832853
547	9	11	racism-4	7	\N	2025-05-16 19:23:19.846332	2025-05-16 19:23:19.846336
552	9	11	sexism-0	15	\N	2025-05-16 19:23:19.867435	2025-05-16 19:23:19.867439
557	9	11	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:19.886495	2025-05-16 19:23:19.886499
562	9	11	stakeholder-name-0	Bob	\N	2025-05-16 19:23:19.898927	2025-05-16 19:23:19.89893
567	9	11	sexism-3	13	\N	2025-05-16 19:23:19.911744	2025-05-16 19:23:19.911749
572	9	11	results-1	its good	\N	2025-05-16 19:23:19.924579	2025-05-16 19:23:19.924582
577	9	14	response-2-lp	sometimes	\N	2025-05-16 19:23:19.939277	2025-05-16 19:23:19.939283
582	9	14	cumulative-score	NaN	\N	2025-05-16 19:23:19.95367	2025-05-16 19:23:19.953673
587	9	7	moral-duty-3	be neutral	\N	2025-05-16 19:23:19.966758	2025-05-16 19:23:19.966762
592	9	15	slider-reverence-for-life-value	7	\N	2025-05-16 19:23:19.980969	2025-05-16 19:23:19.980974
597	9	15	slider-society-responsibility	3	\N	2025-05-16 19:23:19.99425	2025-05-16 19:23:19.994253
602	9	15	slider-reverence-for-place-value	2	\N	2025-05-16 19:23:20.008035	2025-05-16 19:23:20.008043
607	9	13	domain-1	thing 1	\N	2025-05-16 19:23:20.026533	2025-05-16 19:23:20.026539
612	9	13	vice-3	10	\N	2025-05-16 19:23:20.040468	2025-05-16 19:23:20.040472
617	9	13	question-ve	yes	\N	2025-05-16 19:23:20.053652	2025-05-16 19:23:20.053656
622	15	1	dilemma-0	conflict_of_interest	\N	2025-05-16 19:23:31.820978	2025-05-16 19:23:31.820982
627	14	1	dilemma-2	false	\N	2025-05-16 19:23:31.834755	2025-05-16 19:23:31.83476
632	15	1	gather-facts-2	earth	\N	2025-05-16 19:23:31.848975	2025-05-16 19:23:31.848982
637	14	1	stakeholder-name-0	Bob	\N	2025-05-16 19:23:31.863189	2025-05-16 19:23:31.863193
642	15	1	stakeholder-name-1	Jim	\N	2025-05-16 19:23:31.876746	2025-05-16 19:23:31.87675
647	14	1	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:31.891209	2025-05-16 19:23:31.891214
652	15	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:31.904719	2025-05-16 19:23:31.904725
657	14	1	stakeholder-name-6	Charles	\N	2025-05-16 19:23:31.918704	2025-05-16 19:23:31.918708
662	15	1	publicity-yes-0	yes	\N	2025-05-16 19:23:31.937695	2025-05-16 19:23:31.937699
667	14	1	harm-yes-2	yes	\N	2025-05-16 19:23:31.951467	2025-05-16 19:23:31.951471
672	15	1	publicity-no-4	false	\N	2025-05-16 19:23:31.96557	2025-05-16 19:23:31.965575
677	14	1	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:31.983311	2025-05-16 19:23:31.983318
682	15	1	option-description-1	Do a little	\N	2025-05-16 19:23:32.000564	2025-05-16 19:23:32.00057
687	14	1	publicity-no-0	false	\N	2025-05-16 19:23:32.022242	2025-05-16 19:23:32.022249
692	15	1	harm-yes-3	false	\N	2025-05-16 19:23:32.042258	2025-05-16 19:23:32.042263
200	10	1	publicity-yes-2	yes	\N	2025-05-16 19:23:18.740721	2025-05-16 19:23:18.740726
205	9	1	harm-yes-4	false	\N	2025-05-16 19:23:18.757192	2025-05-16 19:23:18.757196
210	10	1	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:18.775585	2025-05-16 19:23:18.775589
215	9	1	option-title-0	Do nothing	\N	2025-05-16 19:23:18.788351	2025-05-16 19:23:18.788355
220	10	1	reversible-no-0	false	\N	2025-05-16 19:23:18.800663	2025-05-16 19:23:18.800667
225	9	1	publicity-no-2	false	\N	2025-05-16 19:23:18.813112	2025-05-16 19:23:18.813116
230	10	1	tentative-choice-0	false	\N	2025-05-16 19:23:18.825209	2025-05-16 19:23:18.825212
235	9	1	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:18.837972	2025-05-16 19:23:18.837977
240	10	1	option-title-3	Get help	\N	2025-05-16 19:23:18.850336	2025-05-16 19:23:18.850339
245	9	1	harm-yes-1	yes	\N	2025-05-16 19:23:18.863099	2025-05-16 19:23:18.863102
250	10	1	publicity-no-3	no	\N	2025-05-16 19:23:18.87549	2025-05-16 19:23:18.875494
255	9	1	tentative-choice-1	false	\N	2025-05-16 19:23:18.889754	2025-05-16 19:23:18.889759
258	9	10	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:18.913932	2025-05-16 19:23:18.913938
263	9	10	stakeholder-directly-1	directly	\N	2025-05-16 19:23:18.930401	2025-05-16 19:23:18.930404
268	9	10	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:18.950618	2025-05-16 19:23:18.950622
273	9	10	responsiveness-2	9	\N	2025-05-16 19:23:18.965467	2025-05-16 19:23:18.96547
278	9	10	results-1-ce	responsivness, because it was less responsive	\N	2025-05-16 19:23:18.978457	2025-05-16 19:23:18.978462
283	9	10	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:18.99713	2025-05-16 19:23:18.997135
288	9	10	competence-5	3	\N	2025-05-16 19:23:19.016413	2025-05-16 19:23:19.016417
293	9	10	stakeholder-name-5	Carol	\N	2025-05-16 19:23:19.030771	2025-05-16 19:23:19.030775
298	9	10	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:19.043878	2025-05-16 19:23:19.043882
303	10	5	moral-virtues	Honesty	\N	2025-05-16 19:23:19.05758	2025-05-16 19:23:19.057584
308	9	5	universalizability-pass	false	\N	2025-05-16 19:23:19.069434	2025-05-16 19:23:19.069437
313	10	5	consistency-pass	pass	\N	2025-05-16 19:23:19.081854	2025-05-16 19:23:19.081858
318	9	2	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:19.09564	2025-05-16 19:23:19.095644
323	10	2	long-term-2	1	\N	2025-05-16 19:23:19.107915	2025-05-16 19:23:19.107918
328	9	2	inverse-long-term-4	4	\N	2025-05-16 19:23:19.120037	2025-05-16 19:23:19.12004
333	10	2	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:19.133682	2025-05-16 19:23:19.133685
338	9	2	stakeholder-name-0	Bob	\N	2025-05-16 19:23:19.15214	2025-05-16 19:23:19.152144
343	10	2	short-term-1	4	\N	2025-05-16 19:23:19.168893	2025-05-16 19:23:19.168897
348	9	2	inverse-short-term-3	4	\N	2025-05-16 19:23:19.181962	2025-05-16 19:23:19.181965
353	10	2	stakeholder-name-5	Carol	\N	2025-05-16 19:23:19.200169	2025-05-16 19:23:19.200172
358	9	2	unranked-long-term	34.29	\N	2025-05-16 19:23:19.216758	2025-05-16 19:23:19.216761
363	10	2	stakeholder-directly-0	directly	\N	2025-05-16 19:23:19.231067	2025-05-16 19:23:19.231072
368	9	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:19.246532	2025-05-16 19:23:19.246536
373	10	2	long-term-3	4	\N	2025-05-16 19:23:19.25945	2025-05-16 19:23:19.259455
378	9	2	inverse-long-term-5	0	\N	2025-05-16 19:23:19.272247	2025-05-16 19:23:19.272251
383	10	2	ranked-short-term	39.29	\N	2025-05-16 19:23:19.285371	2025-05-16 19:23:19.285375
388	9	2	stakeholder-name-1	Jim	\N	2025-05-16 19:23:19.300985	2025-05-16 19:23:19.300989
393	10	2	short-term-2	1	\N	2025-05-16 19:23:19.319855	2025-05-16 19:23:19.319879
398	9	2	inverse-short-term-4	0	\N	2025-05-16 19:23:19.33399	2025-05-16 19:23:19.333995
403	10	2	stakeholder-name-6	Charles	\N	2025-05-16 19:23:19.34792	2025-05-16 19:23:19.347924
408	9	2	num_stakeholders	7	\N	2025-05-16 19:23:19.36737	2025-05-16 19:23:19.367379
413	10	2	stakeholder-directly-1	directly	\N	2025-05-16 19:23:19.386286	2025-05-16 19:23:19.386293
418	9	2	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:19.405545	2025-05-16 19:23:19.405549
423	10	2	long-term-4	1	\N	2025-05-16 19:23:19.422174	2025-05-16 19:23:19.422177
428	9	2	inverse-long-term-6	1	\N	2025-05-16 19:23:19.437084	2025-05-16 19:23:19.437088
433	10	3	pain-0	7	\N	2025-05-16 19:23:19.454965	2025-05-16 19:23:19.454969
438	9	3	pleasure-1	7	\N	2025-05-16 19:23:19.472748	2025-05-16 19:23:19.472754
443	10	3	pleasure-2	1	\N	2025-05-16 19:23:19.489005	2025-05-16 19:23:19.48901
448	9	3	pleasure-4	8	\N	2025-05-16 19:23:19.50336	2025-05-16 19:23:19.503364
453	10	3	pain-6	2	\N	2025-05-16 19:23:19.519938	2025-05-16 19:23:19.519942
458	9	3	total-pain	66	\N	2025-05-16 19:23:19.535835	2025-05-16 19:23:19.535841
463	10	3	cumulative-score	10	\N	2025-05-16 19:23:19.558048	2025-05-16 19:23:19.558052
468	9	4	mill-pain-1	3	\N	2025-05-16 19:23:19.576233	2025-05-16 19:23:19.576239
473	10	4	mill-pain-2	7	\N	2025-05-16 19:23:19.589941	2025-05-16 19:23:19.589944
478	9	4	mill-pleasure-3	7	\N	2025-05-16 19:23:19.603298	2025-05-16 19:23:19.603301
483	10	4	mill-pain-5	2	\N	2025-05-16 19:23:19.616564	2025-05-16 19:23:19.616568
488	9	4	reflection	yes	\N	2025-05-16 19:23:19.632652	2025-05-16 19:23:19.632656
493	10	4	mill-total-pain	176	\N	2025-05-16 19:23:19.65045	2025-05-16 19:23:19.650454
498	9	6	universal-response	not very consistent	\N	2025-05-16 19:23:19.679246	2025-05-16 19:23:19.679251
503	9	8	reparation-slider-1	2	\N	2025-05-16 19:23:19.698822	2025-05-16 19:23:19.698827
508	9	8	topic-2-dva	more important	\N	2025-05-16 19:23:19.716948	2025-05-16 19:23:19.716952
513	9	12	slider-2	2	\N	2025-05-16 19:23:19.739842	2025-05-16 19:23:19.739846
518	9	12	cumulative-score	2	\N	2025-05-16 19:23:19.752943	2025-05-16 19:23:19.752946
523	9	11	ageism-2	12	\N	2025-05-16 19:23:19.771568	2025-05-16 19:23:19.771572
528	9	11	sexism-6	5	\N	2025-05-16 19:23:19.785104	2025-05-16 19:23:19.785108
533	9	11	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:19.803212	2025-05-16 19:23:19.803219
538	9	11	ageism-5	2	\N	2025-05-16 19:23:19.822168	2025-05-16 19:23:19.822173
543	9	11	ableism-1	5	\N	2025-05-16 19:23:19.835476	2025-05-16 19:23:19.835479
548	9	11	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:19.854895	2025-05-16 19:23:19.8549
553	9	11	stakeholder-directly-1	directly	\N	2025-05-16 19:23:19.873909	2025-05-16 19:23:19.873913
558	9	11	ableism-4	12	\N	2025-05-16 19:23:19.888938	2025-05-16 19:23:19.888941
563	9	11	racism-0	15	\N	2025-05-16 19:23:19.901275	2025-05-16 19:23:19.901278
568	9	11	stakeholder-directly-4	false	\N	2025-05-16 19:23:19.914527	2025-05-16 19:23:19.914531
573	9	14	slider-value-0	7	\N	2025-05-16 19:23:19.928077	2025-05-16 19:23:19.928081
578	9	14	slider-scale-0	Ignorance,Wisdom	\N	2025-05-16 19:23:19.942508	2025-05-16 19:23:19.942514
583	9	7	moral-duty-1	be good	\N	2025-05-16 19:23:19.956813	2025-05-16 19:23:19.956817
588	9	7	slider-3	5	\N	2025-05-16 19:23:19.969187	2025-05-16 19:23:19.96919
593	9	15	slider-reverence-for-life	3	\N	2025-05-16 19:23:19.98373	2025-05-16 19:23:19.983734
598	9	15	slider-global-justice-value	10	\N	2025-05-16 19:23:19.996777	2025-05-16 19:23:19.99678
603	9	15	slider-reverence-for-place	8	\N	2025-05-16 19:23:20.011922	2025-05-16 19:23:20.011929
608	9	13	vice-1	17	\N	2025-05-16 19:23:20.029994	2025-05-16 19:23:20.03
613	9	13	domain-4	thing 4	\N	2025-05-16 19:23:20.04349	2025-05-16 19:23:20.043494
618	9	13	reflection-ve	yes	\N	2025-05-16 19:23:20.056452	2025-05-16 19:23:20.056456
624	15	1	dilemma-1	false	\N	2025-05-16 19:23:31.826348	2025-05-16 19:23:31.826352
629	14	1	state-the-problem	The problem exists	\N	2025-05-16 19:23:31.840346	2025-05-16 19:23:31.840349
634	15	1	gather-facts-3	yesterday	\N	2025-05-16 19:23:31.854648	2025-05-16 19:23:31.854652
639	14	1	stakeholder-directly-0	directly	\N	2025-05-16 19:23:31.868663	2025-05-16 19:23:31.868669
644	15	1	stakeholder-directly-1	directly	\N	2025-05-16 19:23:31.882655	2025-05-16 19:23:31.88266
649	14	1	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:31.896503	2025-05-16 19:23:31.896506
654	15	1	stakeholder-directly-4	false	\N	2025-05-16 19:23:31.910185	2025-05-16 19:23:31.910189
659	14	1	option-title-1	Do a little	\N	2025-05-16 19:23:31.927987	2025-05-16 19:23:31.927992
664	15	1	harm-no-1	false	\N	2025-05-16 19:23:31.943412	2025-05-16 19:23:31.943417
669	14	1	reversible-no-2	no	\N	2025-05-16 19:23:31.957261	2025-05-16 19:23:31.957266
674	15	1	tentative-choice-2	false	\N	2025-05-16 19:23:31.97106	2025-05-16 19:23:31.971064
679	14	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:31.989298	2025-05-16 19:23:31.989304
684	15	1	option-title-4	Pay for help	\N	2025-05-16 19:23:32.006412	2025-05-16 19:23:32.006418
689	14	1	publicity-yes-1	yes	\N	2025-05-16 19:23:32.0333	2025-05-16 19:23:32.033307
201	9	1	publicity-yes-2	yes	\N	2025-05-16 19:23:18.743925	2025-05-16 19:23:18.743929
206	10	1	reversible-no-4	false	\N	2025-05-16 19:23:18.762264	2025-05-16 19:23:18.762271
211	9	1	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:18.778101	2025-05-16 19:23:18.778105
216	10	1	option-description-2	Do lots	\N	2025-05-16 19:23:18.790819	2025-05-16 19:23:18.790822
221	9	1	reversible-no-0	false	\N	2025-05-16 19:23:18.803093	2025-05-16 19:23:18.803097
226	10	1	publicity-yes-3	false	\N	2025-05-16 19:23:18.815405	2025-05-16 19:23:18.815409
231	9	1	tentative-choice-0	false	\N	2025-05-16 19:23:18.827551	2025-05-16 19:23:18.827554
236	10	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:18.840416	2025-05-16 19:23:18.84042
241	9	1	option-title-3	Get help	\N	2025-05-16 19:23:18.852901	2025-05-16 19:23:18.852905
246	10	1	reversible-no-1	false	\N	2025-05-16 19:23:18.865441	2025-05-16 19:23:18.865444
251	9	1	publicity-no-3	no	\N	2025-05-16 19:23:18.878284	2025-05-16 19:23:18.878287
259	9	10	attentiveness-0	6	\N	2025-05-16 19:23:18.918449	2025-05-16 19:23:18.918457
264	9	10	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:18.933095	2025-05-16 19:23:18.933099
269	9	10	stakeholder-directly-2	false	\N	2025-05-16 19:23:18.953116	2025-05-16 19:23:18.95312
274	9	10	competence-3	8	\N	2025-05-16 19:23:18.968016	2025-05-16 19:23:18.96802
279	9	10	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:18.981149	2025-05-16 19:23:18.981153
284	9	10	results-2-ce	yes	\N	2025-05-16 19:23:19.002826	2025-05-16 19:23:19.00283
289	9	10	attentiveness-6	8	\N	2025-05-16 19:23:19.020598	2025-05-16 19:23:19.020602
294	9	10	responsiveness-5	8	\N	2025-05-16 19:23:19.033191	2025-05-16 19:23:19.033195
299	9	10	stakeholder-directly-5	false	\N	2025-05-16 19:23:19.04633	2025-05-16 19:23:19.046334
304	9	5	primary-virtue-always	be honest	\N	2025-05-16 19:23:19.060007	2025-05-16 19:23:19.060011
309	10	5	universalizability-pass	false	\N	2025-05-16 19:23:19.072057	2025-05-16 19:23:19.072061
314	9	5	consistency-fail	false	\N	2025-05-16 19:23:19.084395	2025-05-16 19:23:19.084399
319	10	2	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:19.09805	2025-05-16 19:23:19.098054
324	9	2	short-term-3	1	\N	2025-05-16 19:23:19.110251	2025-05-16 19:23:19.110254
329	10	2	inverse-long-term-4	4	\N	2025-05-16 19:23:19.122542	2025-05-16 19:23:19.122546
334	9	2	unranked-short-term	42.86	\N	2025-05-16 19:23:19.136753	2025-05-16 19:23:19.136757
339	10	2	stakeholder-name-0	Bob	\N	2025-05-16 19:23:19.155003	2025-05-16 19:23:19.155008
344	9	2	stakeholder-directly-2	false	\N	2025-05-16 19:23:19.171449	2025-05-16 19:23:19.171453
349	10	2	inverse-short-term-3	4	\N	2025-05-16 19:23:19.188914	2025-05-16 19:23:19.18892
354	9	2	long-term-5	5	\N	2025-05-16 19:23:19.202686	2025-05-16 19:23:19.20269
359	10	2	unranked-long-term	34.29	\N	2025-05-16 19:23:19.219309	2025-05-16 19:23:19.219313
364	9	2	inverse-long-term-0	1	\N	2025-05-16 19:23:19.234571	2025-05-16 19:23:19.234575
369	10	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:19.249063	2025-05-16 19:23:19.249066
374	9	2	short-term-4	5	\N	2025-05-16 19:23:19.262172	2025-05-16 19:23:19.262177
379	10	2	inverse-long-term-5	0	\N	2025-05-16 19:23:19.274984	2025-05-16 19:23:19.274989
384	9	2	cumulative-score	0	\N	2025-05-16 19:23:19.288014	2025-05-16 19:23:19.288019
389	10	2	stakeholder-name-1	Jim	\N	2025-05-16 19:23:19.304005	2025-05-16 19:23:19.304009
394	9	2	stakeholder-directly-3	directly	\N	2025-05-16 19:23:19.322834	2025-05-16 19:23:19.322839
399	10	2	inverse-short-term-4	0	\N	2025-05-16 19:23:19.336952	2025-05-16 19:23:19.336957
404	9	2	long-term-6	4	\N	2025-05-16 19:23:19.350524	2025-05-16 19:23:19.350528
409	10	2	num_stakeholders	7	\N	2025-05-16 19:23:19.370701	2025-05-16 19:23:19.370708
414	9	2	inverse-long-term-1	1	\N	2025-05-16 19:23:19.390037	2025-05-16 19:23:19.390043
419	10	2	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:19.40927	2025-05-16 19:23:19.409275
424	9	2	short-term-5	4	\N	2025-05-16 19:23:19.424788	2025-05-16 19:23:19.424792
429	10	2	inverse-long-term-6	1	\N	2025-05-16 19:23:19.439826	2025-05-16 19:23:19.43983
434	9	3	pleasure-0	7	\N	2025-05-16 19:23:19.457721	2025-05-16 19:23:19.457725
439	10	3	pleasure-1	7	\N	2025-05-16 19:23:19.475871	2025-05-16 19:23:19.475877
444	9	3	pain-3	2	\N	2025-05-16 19:23:19.491959	2025-05-16 19:23:19.491966
449	10	3	pleasure-4	8	\N	2025-05-16 19:23:19.506538	2025-05-16 19:23:19.506543
454	9	3	pleasure-6	7	\N	2025-05-16 19:23:19.522958	2025-05-16 19:23:19.522963
459	10	3	total-pain	66	\N	2025-05-16 19:23:19.539744	2025-05-16 19:23:19.539751
464	9	4	mill-pain-0	3	\N	2025-05-16 19:23:19.562235	2025-05-16 19:23:19.562241
469	10	4	mill-pain-1	3	\N	2025-05-16 19:23:19.578974	2025-05-16 19:23:19.578978
474	9	4	mill-pleasure-2	2	\N	2025-05-16 19:23:19.592919	2025-05-16 19:23:19.592923
479	10	4	mill-pleasure-3	7	\N	2025-05-16 19:23:19.606227	2025-05-16 19:23:19.606231
484	9	4	mill-pain-6	8	\N	2025-05-16 19:23:19.619098	2025-05-16 19:23:19.619102
489	10	4	reflection	yes	\N	2025-05-16 19:23:19.635287	2025-05-16 19:23:19.635291
494	9	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 19:23:19.653066	2025-05-16 19:23:19.65307
499	9	6	decision-response	yes	\N	2025-05-16 19:23:19.681923	2025-05-16 19:23:19.681927
504	9	8	reparation-slider-2	2	\N	2025-05-16 19:23:19.701392	2025-05-16 19:23:19.701396
509	9	8	percentage-action-taken	65	\N	2025-05-16 19:23:19.721418	2025-05-16 19:23:19.721423
514	9	12	topic-sg-0	it just is	\N	2025-05-16 19:23:19.742374	2025-05-16 19:23:19.742377
519	9	11	num_stakeholders	7	\N	2025-05-16 19:23:19.756414	2025-05-16 19:23:19.756418
524	9	11	racism-3	13	\N	2025-05-16 19:23:19.774085	2025-05-16 19:23:19.774089
529	9	11	results-2	neither	\N	2025-05-16 19:23:19.788042	2025-05-16 19:23:19.788046
534	9	11	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:19.806402	2025-05-16 19:23:19.806409
539	9	11	racism-6	16	\N	2025-05-16 19:23:19.824967	2025-05-16 19:23:19.824972
544	9	11	sexism-2	6	\N	2025-05-16 19:23:19.838048	2025-05-16 19:23:19.838051
549	9	11	stakeholder-name-6	Charles	\N	2025-05-16 19:23:19.858136	2025-05-16 19:23:19.858141
554	9	11	ageism-1	6	\N	2025-05-16 19:23:19.876597	2025-05-16 19:23:19.8766
559	9	11	sexism-5	14	\N	2025-05-16 19:23:19.891459	2025-05-16 19:23:19.891463
564	9	11	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:19.903974	2025-05-16 19:23:19.903978
569	9	11	ageism-4	17	\N	2025-05-16 19:23:19.917083	2025-05-16 19:23:19.917087
574	9	14	slider-value-1	8	\N	2025-05-16 19:23:19.930544	2025-05-16 19:23:19.930548
579	9	14	slider-scale-1	Hatred,Loving Kindness	\N	2025-05-16 19:23:19.945655	2025-05-16 19:23:19.94566
584	9	7	slider-1	1	\N	2025-05-16 19:23:19.959349	2025-05-16 19:23:19.959353
589	9	7	num-sacrifices	3	\N	2025-05-16 19:23:19.971882	2025-05-16 19:23:19.971886
594	9	15	slider-interdependence-value	7	\N	2025-05-16 19:23:19.986446	2025-05-16 19:23:19.986451
599	9	15	slider-global-justice	0	\N	2025-05-16 19:23:19.999389	2025-05-16 19:23:19.999393
604	9	15	reflection-1-up	yes they always are	\N	2025-05-16 19:23:20.01512	2025-05-16 19:23:20.015129
609	9	13	domain-2	thing 2	\N	2025-05-16 19:23:20.032598	2025-05-16 19:23:20.032603
614	9	13	vice-4	3	\N	2025-05-16 19:23:20.046161	2025-05-16 19:23:20.046164
619	9	13	num-domains	5	\N	2025-05-16 19:23:20.059132	2025-05-16 19:23:20.059137
626	15	1	dilemma-2	false	\N	2025-05-16 19:23:31.832048	2025-05-16 19:23:31.832053
631	14	1	gather-facts-1	because reasons	\N	2025-05-16 19:23:31.845826	2025-05-16 19:23:31.84583
636	15	1	stakeholder-name-0	Bob	\N	2025-05-16 19:23:31.860402	2025-05-16 19:23:31.860407
641	14	1	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:31.874098	2025-05-16 19:23:31.874103
646	15	1	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:31.888313	2025-05-16 19:23:31.888318
651	14	1	stakeholder-directly-2	false	\N	2025-05-16 19:23:31.901971	2025-05-16 19:23:31.901975
656	15	1	stakeholder-name-6	Charles	\N	2025-05-16 19:23:31.915975	2025-05-16 19:23:31.91598
661	14	1	option-description-3	get some help	\N	2025-05-16 19:23:31.93496	2025-05-16 19:23:31.934964
666	15	1	harm-yes-2	yes	\N	2025-05-16 19:23:31.948882	2025-05-16 19:23:31.948886
671	14	1	reversible-yes-3	false	\N	2025-05-16 19:23:31.962916	2025-05-16 19:23:31.96292
676	15	1	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:31.976952	2025-05-16 19:23:31.976955
681	14	1	stakeholder-directly-6	directly	\N	2025-05-16 19:23:31.997395	2025-05-16 19:23:31.997402
686	15	1	publicity-no-0	false	\N	2025-05-16 19:23:32.016844	2025-05-16 19:23:32.016852
691	14	1	harm-no-2	false	\N	2025-05-16 19:23:32.039179	2025-05-16 19:23:32.039183
696	15	1	reversible-yes-4	yes	\N	2025-05-16 19:23:32.053321	2025-05-16 19:23:32.053324
1652	19	1	dilemma-0	8	\N	2025-05-16 20:12:31.326229	2025-05-16 20:12:31.292663
202	10	1	harm-no-3	no	\N	2025-05-16 19:23:18.748538	2025-05-16 19:23:18.748541
207	9	1	reversible-no-4	false	\N	2025-05-16 19:23:18.764986	2025-05-16 19:23:18.764992
212	10	1	stakeholder-directly-5	false	\N	2025-05-16 19:23:18.780561	2025-05-16 19:23:18.780565
217	9	1	option-description-2	Do lots	\N	2025-05-16 19:23:18.793239	2025-05-16 19:23:18.793242
222	10	1	reversible-yes-1	yes	\N	2025-05-16 19:23:18.805687	2025-05-16 19:23:18.805691
227	9	1	publicity-yes-3	false	\N	2025-05-16 19:23:18.81777	2025-05-16 19:23:18.817773
232	10	1	num_stakeholders	7	\N	2025-05-16 19:23:18.830251	2025-05-16 19:23:18.830255
237	9	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:18.842857	2025-05-16 19:23:18.842875
242	10	1	harm-no-0	false	\N	2025-05-16 19:23:18.855397	2025-05-16 19:23:18.855402
247	9	1	reversible-no-1	false	\N	2025-05-16 19:23:18.867889	2025-05-16 19:23:18.867892
252	10	1	publicity-yes-4	yes	\N	2025-05-16 19:23:18.880779	2025-05-16 19:23:18.880782
260	9	10	competence-0	8	\N	2025-05-16 19:23:18.921782	2025-05-16 19:23:18.921787
265	9	10	attentiveness-1	8	\N	2025-05-16 19:23:18.938003	2025-05-16 19:23:18.938007
270	9	10	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:18.955558	2025-05-16 19:23:18.955562
275	9	10	attentiveness-4	8	\N	2025-05-16 19:23:18.970574	2025-05-16 19:23:18.970577
280	9	10	responsiveness-3	2	\N	2025-05-16 19:23:18.986636	2025-05-16 19:23:18.986642
285	9	10	stakeholder-directly-3	directly	\N	2025-05-16 19:23:19.007182	2025-05-16 19:23:19.007187
290	9	10	num_stakeholders	7	\N	2025-05-16 19:23:19.023046	2025-05-16 19:23:19.02305
295	9	10	competence-6	9	\N	2025-05-16 19:23:19.03561	2025-05-16 19:23:19.035613
300	9	10	stakeholder-name-6	Charles	\N	2025-05-16 19:23:19.049089	2025-05-16 19:23:19.049093
305	10	5	primary-virtue-always	be honest	\N	2025-05-16 19:23:19.06243	2025-05-16 19:23:19.062433
310	9	5	universalizability-fail	fail	\N	2025-05-16 19:23:19.074584	2025-05-16 19:23:19.074587
315	10	5	consistency-fail	false	\N	2025-05-16 19:23:19.086984	2025-05-16 19:23:19.086989
320	9	2	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:19.100575	2025-05-16 19:23:19.100579
325	10	2	short-term-3	1	\N	2025-05-16 19:23:19.112609	2025-05-16 19:23:19.112613
330	9	2	inverse-short-term-5	1	\N	2025-05-16 19:23:19.124978	2025-05-16 19:23:19.124982
335	10	2	unranked-short-term	42.86	\N	2025-05-16 19:23:19.139973	2025-05-16 19:23:19.139978
340	9	2	long-term-0	4	\N	2025-05-16 19:23:19.157975	2025-05-16 19:23:19.15798
345	10	2	stakeholder-directly-2	false	\N	2025-05-16 19:23:19.173939	2025-05-16 19:23:19.173943
350	9	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:19.191463	2025-05-16 19:23:19.191467
355	10	2	long-term-5	5	\N	2025-05-16 19:23:19.208532	2025-05-16 19:23:19.208538
360	9	2	topic-3	unreliable	\N	2025-05-16 19:23:19.22182	2025-05-16 19:23:19.221823
365	10	2	inverse-long-term-0	1	\N	2025-05-16 19:23:19.237894	2025-05-16 19:23:19.237899
370	9	2	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:19.25184	2025-05-16 19:23:19.251843
375	10	2	short-term-4	5	\N	2025-05-16 19:23:19.26478	2025-05-16 19:23:19.264784
380	9	2	inverse-short-term-6	4	\N	2025-05-16 19:23:19.277662	2025-05-16 19:23:19.277665
385	10	2	cumulative-score	0	\N	2025-05-16 19:23:19.2906	2025-05-16 19:23:19.290603
390	9	2	long-term-1	4	\N	2025-05-16 19:23:19.306723	2025-05-16 19:23:19.306726
395	10	2	stakeholder-directly-3	directly	\N	2025-05-16 19:23:19.325622	2025-05-16 19:23:19.325627
400	9	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:19.339632	2025-05-16 19:23:19.339637
405	10	2	long-term-6	4	\N	2025-05-16 19:23:19.353242	2025-05-16 19:23:19.353246
410	9	2	short-term-0	4	\N	2025-05-16 19:23:19.373573	2025-05-16 19:23:19.373578
415	10	2	inverse-long-term-1	1	\N	2025-05-16 19:23:19.393621	2025-05-16 19:23:19.393627
420	9	2	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:19.411983	2025-05-16 19:23:19.411987
425	10	2	short-term-5	4	\N	2025-05-16 19:23:19.428953	2025-05-16 19:23:19.428958
430	9	2	topic-1	bad	\N	2025-05-16 19:23:19.44315	2025-05-16 19:23:19.443154
435	10	3	pleasure-0	7	\N	2025-05-16 19:23:19.460782	2025-05-16 19:23:19.460785
440	9	3	pain-2	8	\N	2025-05-16 19:23:19.479972	2025-05-16 19:23:19.479977
445	10	3	pain-3	2	\N	2025-05-16 19:23:19.49478	2025-05-16 19:23:19.494786
450	9	3	pain-5	8	\N	2025-05-16 19:23:19.50927	2025-05-16 19:23:19.509274
455	10	3	pleasure-6	7	\N	2025-05-16 19:23:19.525578	2025-05-16 19:23:19.525582
460	9	3	pleasure-pain-ratio	73	\N	2025-05-16 19:23:19.543906	2025-05-16 19:23:19.543914
465	10	4	mill-pain-0	3	\N	2025-05-16 19:23:19.565035	2025-05-16 19:23:19.565039
470	9	4	mill-pleasure-1	2	\N	2025-05-16 19:23:19.581609	2025-05-16 19:23:19.581615
475	10	4	mill-pleasure-2	2	\N	2025-05-16 19:23:19.595498	2025-05-16 19:23:19.595501
480	9	4	mill-pleasure-4	2	\N	2025-05-16 19:23:19.608785	2025-05-16 19:23:19.608789
485	10	4	mill-pain-6	8	\N	2025-05-16 19:23:19.621674	2025-05-16 19:23:19.621678
490	9	4	mill-total-pleasure	84	\N	2025-05-16 19:23:19.63779	2025-05-16 19:23:19.637794
495	10	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 19:23:19.658673	2025-05-16 19:23:19.658677
500	9	6	better-world-response	probably	\N	2025-05-16 19:23:19.684577	2025-05-16 19:23:19.684581
505	9	8	gratitude-slider-1	8	\N	2025-05-16 19:23:19.703926	2025-05-16 19:23:19.70393
510	9	8	cumulative-score	7	\N	2025-05-16 19:23:19.724697	2025-05-16 19:23:19.724701
515	9	12	topic-sg-1	kind of	\N	2025-05-16 19:23:19.744963	2025-05-16 19:23:19.744967
520	9	11	ableism-0	15	\N	2025-05-16 19:23:19.759616	2025-05-16 19:23:19.759619
525	9	11	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:19.776525	2025-05-16 19:23:19.776528
530	9	11	stakeholder-directly-0	directly	\N	2025-05-16 19:23:19.790871	2025-05-16 19:23:19.790876
535	9	11	ableism-3	13	\N	2025-05-16 19:23:19.809215	2025-05-16 19:23:19.809219
540	9	11	results-3	probably	\N	2025-05-16 19:23:19.827597	2025-05-16 19:23:19.827601
545	9	11	stakeholder-directly-3	directly	\N	2025-05-16 19:23:19.840858	2025-05-16 19:23:19.840875
550	9	11	ableism-6	3	\N	2025-05-16 19:23:19.861345	2025-05-16 19:23:19.86135
555	9	11	racism-2	15	\N	2025-05-16 19:23:19.881089	2025-05-16 19:23:19.881093
560	9	11	stakeholder-directly-6	directly	\N	2025-05-16 19:23:19.893959	2025-05-16 19:23:19.893962
565	9	11	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:19.906414	2025-05-16 19:23:19.906418
570	9	11	racism-5	12	\N	2025-05-16 19:23:19.919492	2025-05-16 19:23:19.919496
575	9	14	slider-value-2	9	\N	2025-05-16 19:23:19.933289	2025-05-16 19:23:19.933293
580	9	14	slider-scale-2	Greed,Generosity	\N	2025-05-16 19:23:19.948434	2025-05-16 19:23:19.948439
585	9	7	moral-duty-2	be bad	\N	2025-05-16 19:23:19.961814	2025-05-16 19:23:19.961818
590	9	7	average-sacrifice	5	\N	2025-05-16 19:23:19.975012	2025-05-16 19:23:19.975017
595	9	15	slider-interdependence	3	\N	2025-05-16 19:23:19.989063	2025-05-16 19:23:19.989067
600	9	15	slider-environmental-stewardship-value	2	\N	2025-05-16 19:23:20.001818	2025-05-16 19:23:20.001821
605	9	15	reflection-2-up	people are different	\N	2025-05-16 19:23:20.01846	2025-05-16 19:23:20.018466
610	9	13	vice-2	5	\N	2025-05-16 19:23:20.035286	2025-05-16 19:23:20.03529
615	9	13	domain-5	thing 5	\N	2025-05-16 19:23:20.048559	2025-05-16 19:23:20.048562
620	9	13	vv-average	5	\N	2025-05-16 19:23:20.06172	2025-05-16 19:23:20.061723
625	14	1	dilemma-1	false	\N	2025-05-16 19:23:31.829085	2025-05-16 19:23:31.829089
630	15	1	gather-facts-1	because reasons	\N	2025-05-16 19:23:31.843046	2025-05-16 19:23:31.84305
635	14	1	gather-facts-3	yesterday	\N	2025-05-16 19:23:31.857502	2025-05-16 19:23:31.857506
640	15	1	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:31.871465	2025-05-16 19:23:31.87147
645	14	1	stakeholder-directly-1	directly	\N	2025-05-16 19:23:31.885545	2025-05-16 19:23:31.88555
650	15	1	stakeholder-directly-2	false	\N	2025-05-16 19:23:31.899163	2025-05-16 19:23:31.899166
655	14	1	stakeholder-directly-4	false	\N	2025-05-16 19:23:31.913241	2025-05-16 19:23:31.913246
660	15	1	option-description-3	get some help	\N	2025-05-16 19:23:31.931316	2025-05-16 19:23:31.931321
665	14	1	harm-no-1	false	\N	2025-05-16 19:23:31.946233	2025-05-16 19:23:31.946237
670	15	1	reversible-yes-3	false	\N	2025-05-16 19:23:31.960102	2025-05-16 19:23:31.960107
675	14	1	tentative-choice-2	false	\N	2025-05-16 19:23:31.97388	2025-05-16 19:23:31.973886
680	15	1	stakeholder-directly-6	directly	\N	2025-05-16 19:23:31.993164	2025-05-16 19:23:31.99317
685	14	1	option-title-4	Pay for help	\N	2025-05-16 19:23:32.01155	2025-05-16 19:23:32.011557
690	15	1	harm-no-2	false	\N	2025-05-16 19:23:32.036198	2025-05-16 19:23:32.036204
695	14	1	reversible-no-3	no	\N	2025-05-16 19:23:32.050645	2025-05-16 19:23:32.050649
2187	24	1	dilemma-0	8	\N	2025-05-16 20:15:25.845532	2025-05-16 20:15:25.783525
694	15	1	reversible-no-3	no	\N	2025-05-16 19:23:32.047894	2025-05-16 19:23:32.047898
699	14	1	tentative-choice-3	Get help	\N	2025-05-16 19:23:32.066298	2025-05-16 19:23:32.066301
704	15	1	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:32.080467	2025-05-16 19:23:32.080471
709	14	1	option-description-4	pay for some help	\N	2025-05-16 19:23:32.094759	2025-05-16 19:23:32.094763
714	15	1	publicity-yes-2	yes	\N	2025-05-16 19:23:32.109934	2025-05-16 19:23:32.109938
719	14	1	harm-yes-4	false	\N	2025-05-16 19:23:32.124009	2025-05-16 19:23:32.124012
724	15	1	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:32.138244	2025-05-16 19:23:32.138248
729	14	1	option-title-0	Do nothing	\N	2025-05-16 19:23:32.153287	2025-05-16 19:23:32.153292
734	15	1	reversible-no-0	false	\N	2025-05-16 19:23:32.167982	2025-05-16 19:23:32.167987
739	14	1	publicity-no-2	false	\N	2025-05-16 19:23:32.187732	2025-05-16 19:23:32.187736
744	15	1	tentative-choice-0	false	\N	2025-05-16 19:23:32.201042	2025-05-16 19:23:32.201046
749	14	1	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:32.217721	2025-05-16 19:23:32.217726
754	15	1	option-title-3	Get help	\N	2025-05-16 19:23:32.231658	2025-05-16 19:23:32.231661
759	14	1	harm-yes-1	yes	\N	2025-05-16 19:23:32.246164	2025-05-16 19:23:32.246168
764	15	1	publicity-no-3	no	\N	2025-05-16 19:23:32.259306	2025-05-16 19:23:32.25931
769	14	1	tentative-choice-1	false	\N	2025-05-16 19:23:32.274195	2025-05-16 19:23:32.274199
772	14	10	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:32.294108	2025-05-16 19:23:32.294112
777	14	10	stakeholder-directly-1	directly	\N	2025-05-16 19:23:32.325314	2025-05-16 19:23:32.325319
782	14	10	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:32.356189	2025-05-16 19:23:32.356196
787	14	10	responsiveness-2	9	\N	2025-05-16 19:23:32.384883	2025-05-16 19:23:32.384888
792	14	10	results-1-ce	responsivness, because it was less responsive	\N	2025-05-16 19:23:32.40081	2025-05-16 19:23:32.400814
797	14	10	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:32.415647	2025-05-16 19:23:32.415652
802	14	10	competence-5	3	\N	2025-05-16 19:23:32.446707	2025-05-16 19:23:32.446711
807	14	10	stakeholder-name-5	Carol	\N	2025-05-16 19:23:32.467263	2025-05-16 19:23:32.467266
812	14	10	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:32.480079	2025-05-16 19:23:32.480082
817	15	5	moral-virtues	Honesty	\N	2025-05-16 19:23:32.49337	2025-05-16 19:23:32.493373
822	14	5	universalizability-pass	false	\N	2025-05-16 19:23:32.506462	2025-05-16 19:23:32.506466
827	15	5	consistency-pass	pass	\N	2025-05-16 19:23:32.51898	2025-05-16 19:23:32.518983
832	14	2	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:32.532284	2025-05-16 19:23:32.532288
837	15	2	long-term-2	1	\N	2025-05-16 19:23:32.55052	2025-05-16 19:23:32.550525
842	14	2	inverse-long-term-4	4	\N	2025-05-16 19:23:32.563302	2025-05-16 19:23:32.563305
847	15	2	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:32.576045	2025-05-16 19:23:32.576049
852	14	2	stakeholder-name-0	Bob	\N	2025-05-16 19:23:32.588686	2025-05-16 19:23:32.58869
857	15	2	short-term-1	4	\N	2025-05-16 19:23:32.60143	2025-05-16 19:23:32.601433
862	14	2	inverse-short-term-3	4	\N	2025-05-16 19:23:32.613844	2025-05-16 19:23:32.613847
867	15	2	stakeholder-name-5	Carol	\N	2025-05-16 19:23:32.626281	2025-05-16 19:23:32.626285
872	14	2	unranked-long-term	34.29	\N	2025-05-16 19:23:32.638667	2025-05-16 19:23:32.638671
877	15	2	stakeholder-directly-0	directly	\N	2025-05-16 19:23:32.652136	2025-05-16 19:23:32.652141
882	14	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:32.665741	2025-05-16 19:23:32.665744
887	15	2	long-term-3	4	\N	2025-05-16 19:23:32.678471	2025-05-16 19:23:32.678476
892	14	2	inverse-long-term-5	0	\N	2025-05-16 19:23:32.691599	2025-05-16 19:23:32.691603
897	15	2	ranked-short-term	39.29	\N	2025-05-16 19:23:32.706645	2025-05-16 19:23:32.706649
902	14	2	stakeholder-name-1	Jim	\N	2025-05-16 19:23:32.721273	2025-05-16 19:23:32.721277
907	15	2	short-term-2	1	\N	2025-05-16 19:23:32.733721	2025-05-16 19:23:32.733724
912	14	2	inverse-short-term-4	0	\N	2025-05-16 19:23:32.747316	2025-05-16 19:23:32.747321
917	15	2	stakeholder-name-6	Charles	\N	2025-05-16 19:23:32.760427	2025-05-16 19:23:32.76043
922	14	2	num_stakeholders	7	\N	2025-05-16 19:23:32.772593	2025-05-16 19:23:32.772596
927	15	2	stakeholder-directly-1	directly	\N	2025-05-16 19:23:32.785745	2025-05-16 19:23:32.785749
932	14	2	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:32.79874	2025-05-16 19:23:32.798743
937	15	2	long-term-4	1	\N	2025-05-16 19:23:32.811344	2025-05-16 19:23:32.811349
942	14	2	inverse-long-term-6	1	\N	2025-05-16 19:23:32.824099	2025-05-16 19:23:32.824103
947	15	3	pain-0	7	\N	2025-05-16 19:23:32.836527	2025-05-16 19:23:32.83653
952	14	3	pleasure-1	7	\N	2025-05-16 19:23:32.84933	2025-05-16 19:23:32.849334
957	15	3	pleasure-2	1	\N	2025-05-16 19:23:32.861439	2025-05-16 19:23:32.861443
962	14	3	pleasure-4	8	\N	2025-05-16 19:23:32.874387	2025-05-16 19:23:32.87439
967	15	3	pain-6	2	\N	2025-05-16 19:23:32.886917	2025-05-16 19:23:32.88692
972	14	3	total-pain	66	\N	2025-05-16 19:23:32.898658	2025-05-16 19:23:32.898661
977	15	3	cumulative-score	10	\N	2025-05-16 19:23:32.91134	2025-05-16 19:23:32.911343
982	14	4	mill-pain-1	3	\N	2025-05-16 19:23:32.92334	2025-05-16 19:23:32.923343
987	15	4	mill-pain-2	7	\N	2025-05-16 19:23:32.935268	2025-05-16 19:23:32.935273
992	14	4	mill-pleasure-3	7	\N	2025-05-16 19:23:32.94719	2025-05-16 19:23:32.947194
997	15	4	mill-pain-5	2	\N	2025-05-16 19:23:32.958985	2025-05-16 19:23:32.958988
1002	14	4	reflection	yes	\N	2025-05-16 19:23:32.973117	2025-05-16 19:23:32.973121
1007	15	4	mill-total-pain	176	\N	2025-05-16 19:23:32.985903	2025-05-16 19:23:32.985907
1012	14	6	universal-response	not very consistent	\N	2025-05-16 19:23:32.998992	2025-05-16 19:23:32.998995
1017	14	8	reparation-slider-1	2	\N	2025-05-16 19:23:33.012173	2025-05-16 19:23:33.012177
1022	14	8	topic-2-dva	more important	\N	2025-05-16 19:23:33.024777	2025-05-16 19:23:33.024781
1027	14	12	slider-2	2	\N	2025-05-16 19:23:33.039116	2025-05-16 19:23:33.03912
1032	14	12	cumulative-score	2	\N	2025-05-16 19:23:33.05324	2025-05-16 19:23:33.053244
1037	14	11	ageism-2	12	\N	2025-05-16 19:23:33.0666	2025-05-16 19:23:33.066603
1042	14	11	sexism-6	5	\N	2025-05-16 19:23:33.080436	2025-05-16 19:23:33.08044
1047	14	11	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:33.093982	2025-05-16 19:23:33.093985
1052	14	11	ageism-5	2	\N	2025-05-16 19:23:33.107592	2025-05-16 19:23:33.107596
1057	14	11	ableism-1	5	\N	2025-05-16 19:23:33.120899	2025-05-16 19:23:33.120903
1062	14	11	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:33.13465	2025-05-16 19:23:33.134654
1067	14	11	stakeholder-directly-1	directly	\N	2025-05-16 19:23:33.147469	2025-05-16 19:23:33.147472
1072	14	11	ableism-4	12	\N	2025-05-16 19:23:33.160238	2025-05-16 19:23:33.160242
1077	14	11	racism-0	15	\N	2025-05-16 19:23:33.173365	2025-05-16 19:23:33.173369
1082	14	11	stakeholder-directly-4	false	\N	2025-05-16 19:23:33.185262	2025-05-16 19:23:33.185266
1087	14	14	slider-value-0	7	\N	2025-05-16 19:23:33.198891	2025-05-16 19:23:33.198895
1092	14	14	slider-scale-0	Ignorance,Wisdom	\N	2025-05-16 19:23:33.212396	2025-05-16 19:23:33.212399
1097	14	7	moral-duty-1	be good	\N	2025-05-16 19:23:33.225647	2025-05-16 19:23:33.225651
1102	14	7	slider-3	5	\N	2025-05-16 19:23:33.239451	2025-05-16 19:23:33.239454
1107	14	15	slider-reverence-for-life	3	\N	2025-05-16 19:23:33.251844	2025-05-16 19:23:33.251848
1112	14	15	slider-global-justice-value	10	\N	2025-05-16 19:23:33.264561	2025-05-16 19:23:33.264564
1117	14	15	slider-reverence-for-place	8	\N	2025-05-16 19:23:33.277818	2025-05-16 19:23:33.277822
1122	14	13	vice-1	17	\N	2025-05-16 19:23:33.291404	2025-05-16 19:23:33.291407
1127	14	13	domain-4	thing 4	\N	2025-05-16 19:23:33.305838	2025-05-16 19:23:33.305842
1132	14	13	reflection-ve	yes	\N	2025-05-16 19:23:33.319222	2025-05-16 19:23:33.319227
1136	20	1	dilemma-0	conflict_of_interest	\N	2025-05-16 20:12:01.465089	2025-05-16 20:12:01.465096
1146	20	1	gather-facts-2	earth	\N	2025-05-16 20:12:01.498925	2025-05-16 20:12:01.49893
1156	20	1	stakeholder-name-1	Jim	\N	2025-05-16 20:12:01.527986	2025-05-16 20:12:01.527991
1166	20	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:12:01.555653	2025-05-16 20:12:01.555657
1176	20	1	publicity-yes-0	yes	\N	2025-05-16 20:12:01.584843	2025-05-16 20:12:01.584847
697	14	1	reversible-yes-4	yes	\N	2025-05-16 19:23:32.057975	2025-05-16 19:23:32.057979
702	15	1	stakeholder-name-5	Carol	\N	2025-05-16 19:23:32.074948	2025-05-16 19:23:32.074953
707	14	1	option-title-2	Do lots 	\N	2025-05-16 19:23:32.08922	2025-05-16 19:23:32.089223
712	15	1	publicity-no-1	false	\N	2025-05-16 19:23:32.103113	2025-05-16 19:23:32.103117
717	14	1	harm-no-3	no	\N	2025-05-16 19:23:32.118152	2025-05-16 19:23:32.118155
722	15	1	tentative-choice-4	false	\N	2025-05-16 19:23:32.132437	2025-05-16 19:23:32.132441
727	14	1	stakeholder-directly-5	false	\N	2025-05-16 19:23:32.146389	2025-05-16 19:23:32.146393
732	15	1	harm-yes-0	yes	\N	2025-05-16 19:23:32.16189	2025-05-16 19:23:32.161896
737	14	1	reversible-yes-1	yes	\N	2025-05-16 19:23:32.182252	2025-05-16 19:23:32.182259
742	15	1	harm-no-4	no	\N	2025-05-16 19:23:32.195725	2025-05-16 19:23:32.195728
747	14	1	num_stakeholders	7	\N	2025-05-16 19:23:32.211154	2025-05-16 19:23:32.21116
752	15	1	option-description-0	Do nothing	\N	2025-05-16 19:23:32.225766	2025-05-16 19:23:32.22577
757	14	1	harm-no-0	false	\N	2025-05-16 19:23:32.240836	2025-05-16 19:23:32.24084
762	15	1	reversible-yes-2	false	\N	2025-05-16 19:23:32.254027	2025-05-16 19:23:32.254031
767	14	1	publicity-yes-4	yes	\N	2025-05-16 19:23:32.268005	2025-05-16 19:23:32.26801
770	14	10	stakeholder-name-0	Bob	\N	2025-05-16 19:23:32.285263	2025-05-16 19:23:32.285267
775	14	10	responsiveness-0	7	\N	2025-05-16 19:23:32.314069	2025-05-16 19:23:32.314076
780	14	10	competence-1	7	\N	2025-05-16 19:23:32.340287	2025-05-16 19:23:32.340291
785	14	10	attentiveness-2	5	\N	2025-05-16 19:23:32.373178	2025-05-16 19:23:32.373183
790	14	10	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:32.395392	2025-05-16 19:23:32.395396
795	14	10	competence-4	2	\N	2025-05-16 19:23:32.40854	2025-05-16 19:23:32.408544
800	14	10	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:32.43516	2025-05-16 19:23:32.435167
805	14	10	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:32.461873	2025-05-16 19:23:32.461879
810	14	10	cumulative-score	6	\N	2025-05-16 19:23:32.475	2025-05-16 19:23:32.475003
815	14	10	responsiveness-6	7	\N	2025-05-16 19:23:32.488052	2025-05-16 19:23:32.488055
820	14	5	primary-virtue-never	be dishonest	\N	2025-05-16 19:23:32.501342	2025-05-16 19:23:32.501345
825	15	5	universalizability-fail	fail	\N	2025-05-16 19:23:32.514078	2025-05-16 19:23:32.514081
830	14	2	inverse-short-term-0	1	\N	2025-05-16 19:23:32.526447	2025-05-16 19:23:32.526452
835	15	2	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:32.54152	2025-05-16 19:23:32.541524
840	14	2	stakeholder-directly-4	false	\N	2025-05-16 19:23:32.558247	2025-05-16 19:23:32.55825
845	15	2	inverse-short-term-5	1	\N	2025-05-16 19:23:32.571059	2025-05-16 19:23:32.571063
850	14	2	topic-2	yes	\N	2025-05-16 19:23:32.583653	2025-05-16 19:23:32.583657
855	15	2	long-term-0	4	\N	2025-05-16 19:23:32.596382	2025-05-16 19:23:32.596386
860	14	2	inverse-long-term-2	4	\N	2025-05-16 19:23:32.608824	2025-05-16 19:23:32.608828
865	15	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:32.621226	2025-05-16 19:23:32.62123
870	14	2	short-term-6	1	\N	2025-05-16 19:23:32.633665	2025-05-16 19:23:32.633669
875	15	2	topic-3	unreliable	\N	2025-05-16 19:23:32.646744	2025-05-16 19:23:32.646748
880	14	2	inverse-short-term-1	1	\N	2025-05-16 19:23:32.660656	2025-05-16 19:23:32.660661
885	15	2	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:32.673106	2025-05-16 19:23:32.673109
890	14	2	stakeholder-directly-5	false	\N	2025-05-16 19:23:32.686416	2025-05-16 19:23:32.68642
895	15	2	inverse-short-term-6	4	\N	2025-05-16 19:23:32.699708	2025-05-16 19:23:32.699713
900	14	2	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:32.715966	2025-05-16 19:23:32.715971
905	15	2	long-term-1	4	\N	2025-05-16 19:23:32.728842	2025-05-16 19:23:32.728845
910	14	2	inverse-long-term-3	1	\N	2025-05-16 19:23:32.741883	2025-05-16 19:23:32.741886
915	15	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:32.755326	2025-05-16 19:23:32.755331
920	14	2	ranked-long-term	35.71	\N	2025-05-16 19:23:32.767757	2025-05-16 19:23:32.767761
925	15	2	short-term-0	4	\N	2025-05-16 19:23:32.780901	2025-05-16 19:23:32.780905
930	14	2	inverse-short-term-2	4	\N	2025-05-16 19:23:32.79327	2025-05-16 19:23:32.793274
935	15	2	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:32.805894	2025-05-16 19:23:32.805898
940	14	2	stakeholder-directly-6	directly	\N	2025-05-16 19:23:32.819288	2025-05-16 19:23:32.819291
945	15	2	topic-1	bad	\N	2025-05-16 19:23:32.831448	2025-05-16 19:23:32.831451
950	14	3	pain-1	8	\N	2025-05-16 19:23:32.84432	2025-05-16 19:23:32.844324
955	15	3	pain-2	8	\N	2025-05-16 19:23:32.856698	2025-05-16 19:23:32.856701
960	14	3	pleasure-3	2	\N	2025-05-16 19:23:32.869039	2025-05-16 19:23:32.869043
965	15	3	pain-5	8	\N	2025-05-16 19:23:32.882064	2025-05-16 19:23:32.882067
970	14	3	total-pleasure	175	\N	2025-05-16 19:23:32.894041	2025-05-16 19:23:32.894044
975	15	3	pleasure-pain-ratio	73	\N	2025-05-16 19:23:32.906454	2025-05-16 19:23:32.906457
980	14	4	mill-pleasure-0	1	\N	2025-05-16 19:23:32.918703	2025-05-16 19:23:32.918706
985	15	4	mill-pleasure-1	2	\N	2025-05-16 19:23:32.93046	2025-05-16 19:23:32.930463
990	14	4	mill-pain-3	7	\N	2025-05-16 19:23:32.942527	2025-05-16 19:23:32.94253
995	15	4	mill-pleasure-4	2	\N	2025-05-16 19:23:32.954395	2025-05-16 19:23:32.954398
1000	14	4	mill-pleasure-6	6	\N	2025-05-16 19:23:32.967531	2025-05-16 19:23:32.967537
1005	15	4	mill-total-pleasure	84	\N	2025-05-16 19:23:32.980674	2025-05-16 19:23:32.980679
1010	14	4	cumulative-score	0	\N	2025-05-16 19:23:32.993888	2025-05-16 19:23:32.993892
1015	14	8	fidelity-slider-1	7	\N	2025-05-16 19:23:33.006966	2025-05-16 19:23:33.00697
1020	14	8	gratitude-slider-2	7	\N	2025-05-16 19:23:33.019942	2025-05-16 19:23:33.019945
1025	14	12	slider-0	2	\N	2025-05-16 19:23:33.033218	2025-05-16 19:23:33.033222
1030	14	12	topic-sg-2	no and no	\N	2025-05-16 19:23:33.047839	2025-05-16 19:23:33.047844
1035	14	11	sexism-1	5	\N	2025-05-16 19:23:33.061394	2025-05-16 19:23:33.061399
1040	14	11	stakeholder-name-5	Carol	\N	2025-05-16 19:23:33.074726	2025-05-16 19:23:33.07473
1045	14	11	ageism-0	15	\N	2025-05-16 19:23:33.088672	2025-05-16 19:23:33.088675
1050	14	11	sexism-4	5	\N	2025-05-16 19:23:33.102434	2025-05-16 19:23:33.102439
1055	14	11	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:33.115684	2025-05-16 19:23:33.115688
1060	14	11	ageism-3	5	\N	2025-05-16 19:23:33.129169	2025-05-16 19:23:33.129174
1065	14	11	cumulative-score	5	\N	2025-05-16 19:23:33.142324	2025-05-16 19:23:33.142328
1070	14	11	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:33.155212	2025-05-16 19:23:33.155215
1075	14	11	ageism-6	15	\N	2025-05-16 19:23:33.168467	2025-05-16 19:23:33.168471
1080	14	11	ableism-2	4	\N	2025-05-16 19:23:33.180579	2025-05-16 19:23:33.180582
1085	14	11	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:33.192616	2025-05-16 19:23:33.19262
1090	14	14	response-1-lp	wrong	\N	2025-05-16 19:23:33.20704	2025-05-16 19:23:33.207043
1095	14	14	num-sliders-lp	3	\N	2025-05-16 19:23:33.220107	2025-05-16 19:23:33.220111
1100	14	7	slider-2	10	\N	2025-05-16 19:23:33.234047	2025-05-16 19:23:33.23405
1105	14	7	cumulative-score	5	\N	2025-05-16 19:23:33.246963	2025-05-16 19:23:33.246966
1110	14	15	slider-society-responsibility-value	7	\N	2025-05-16 19:23:33.25931	2025-05-16 19:23:33.259313
1115	14	15	slider-environmental-stewardship	8	\N	2025-05-16 19:23:33.272359	2025-05-16 19:23:33.272363
1120	14	15	cumulative-score	-3	\N	2025-05-16 19:23:33.285835	2025-05-16 19:23:33.285838
1125	14	13	domain-3	thing 3	\N	2025-05-16 19:23:33.299741	2025-05-16 19:23:33.299746
1130	14	13	vice-5	17	\N	2025-05-16 19:23:33.313751	2025-05-16 19:23:33.313755
1135	14	13	cumulative-score	5	\N	2025-05-16 19:23:33.328017	2025-05-16 19:23:33.328021
1142	20	1	state-the-problem	The problem exists	\N	2025-05-16 20:12:01.486355	2025-05-16 20:12:01.486361
1152	20	1	stakeholder-directly-0	directly	\N	2025-05-16 20:12:01.515869	2025-05-16 20:12:01.515877
1162	20	1	stakeholder-name-2	Cindy	\N	2025-05-16 20:12:01.544717	2025-05-16 20:12:01.544722
1172	20	1	option-title-1	Do a little	\N	2025-05-16 20:12:01.573256	2025-05-16 20:12:01.573261
1182	20	1	reversible-no-2	no	\N	2025-05-16 20:12:01.601335	2025-05-16 20:12:01.601339
1186	20	1	publicity-no-4	false	\N	2025-05-16 20:12:01.614195	2025-05-16 20:12:01.6142
698	15	1	tentative-choice-3	Get help	\N	2025-05-16 19:23:32.063546	2025-05-16 19:23:32.06355
703	14	1	stakeholder-name-5	Carol	\N	2025-05-16 19:23:32.077695	2025-05-16 19:23:32.077699
708	15	1	option-description-4	pay for some help	\N	2025-05-16 19:23:32.092078	2025-05-16 19:23:32.092082
713	14	1	publicity-no-1	false	\N	2025-05-16 19:23:32.106792	2025-05-16 19:23:32.106815
718	15	1	harm-yes-4	false	\N	2025-05-16 19:23:32.121093	2025-05-16 19:23:32.121096
723	14	1	tentative-choice-4	false	\N	2025-05-16 19:23:32.135396	2025-05-16 19:23:32.135403
728	15	1	option-title-0	Do nothing	\N	2025-05-16 19:23:32.149497	2025-05-16 19:23:32.149501
733	14	1	harm-yes-0	yes	\N	2025-05-16 19:23:32.164968	2025-05-16 19:23:32.164973
738	15	1	publicity-no-2	false	\N	2025-05-16 19:23:32.185069	2025-05-16 19:23:32.185074
743	14	1	harm-no-4	no	\N	2025-05-16 19:23:32.198349	2025-05-16 19:23:32.198352
748	15	1	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:32.214749	2025-05-16 19:23:32.214755
753	14	1	option-description-0	Do nothing	\N	2025-05-16 19:23:32.228613	2025-05-16 19:23:32.228617
758	15	1	harm-yes-1	yes	\N	2025-05-16 19:23:32.243522	2025-05-16 19:23:32.243526
763	14	1	reversible-yes-2	false	\N	2025-05-16 19:23:32.25655	2025-05-16 19:23:32.256555
768	15	1	tentative-choice-1	false	\N	2025-05-16 19:23:32.270994	2025-05-16 19:23:32.270999
771	14	10	stakeholder-directly-0	directly	\N	2025-05-16 19:23:32.291311	2025-05-16 19:23:32.291315
776	14	10	stakeholder-name-1	Jim	\N	2025-05-16 19:23:32.318969	2025-05-16 19:23:32.318974
781	14	10	responsiveness-1	2	\N	2025-05-16 19:23:32.344435	2025-05-16 19:23:32.34444
786	14	10	competence-2	8	\N	2025-05-16 19:23:32.380043	2025-05-16 19:23:32.380049
791	14	10	stakeholder-directly-6	directly	\N	2025-05-16 19:23:32.398092	2025-05-16 19:23:32.398095
796	14	10	attentiveness-5	9	\N	2025-05-16 19:23:32.411091	2025-05-16 19:23:32.411095
801	14	10	responsiveness-4	0	\N	2025-05-16 19:23:32.443914	2025-05-16 19:23:32.44392
806	14	10	stakeholder-directly-4	false	\N	2025-05-16 19:23:32.464613	2025-05-16 19:23:32.464617
811	14	10	attentiveness-3	6	\N	2025-05-16 19:23:32.477487	2025-05-16 19:23:32.477491
816	14	5	moral-virtues	Honesty	\N	2025-05-16 19:23:32.490836	2025-05-16 19:23:32.490839
821	15	5	primary-virtue-never	be dishonest	\N	2025-05-16 19:23:32.503913	2025-05-16 19:23:32.503917
826	14	5	consistency-pass	pass	\N	2025-05-16 19:23:32.516536	2025-05-16 19:23:32.516539
831	15	2	inverse-short-term-0	1	\N	2025-05-16 19:23:32.528921	2025-05-16 19:23:32.528924
836	14	2	long-term-2	1	\N	2025-05-16 19:23:32.547779	2025-05-16 19:23:32.547784
841	15	2	stakeholder-directly-4	false	\N	2025-05-16 19:23:32.56077	2025-05-16 19:23:32.560774
846	14	2	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:32.573468	2025-05-16 19:23:32.573472
851	15	2	topic-2	yes	\N	2025-05-16 19:23:32.586197	2025-05-16 19:23:32.586201
856	14	2	short-term-1	4	\N	2025-05-16 19:23:32.598917	2025-05-16 19:23:32.598921
861	15	2	inverse-long-term-2	4	\N	2025-05-16 19:23:32.611307	2025-05-16 19:23:32.61131
866	14	2	stakeholder-name-5	Carol	\N	2025-05-16 19:23:32.62371	2025-05-16 19:23:32.623714
871	15	2	short-term-6	1	\N	2025-05-16 19:23:32.636179	2025-05-16 19:23:32.636183
876	14	2	stakeholder-directly-0	directly	\N	2025-05-16 19:23:32.649462	2025-05-16 19:23:32.649466
881	15	2	inverse-short-term-1	1	\N	2025-05-16 19:23:32.663241	2025-05-16 19:23:32.663245
886	14	2	long-term-3	4	\N	2025-05-16 19:23:32.675786	2025-05-16 19:23:32.67579
891	15	2	stakeholder-directly-5	false	\N	2025-05-16 19:23:32.688976	2025-05-16 19:23:32.688979
896	14	2	ranked-short-term	39.29	\N	2025-05-16 19:23:32.704048	2025-05-16 19:23:32.704053
901	15	2	stakeholder-indirectly-0	false	\N	2025-05-16 19:23:32.718714	2025-05-16 19:23:32.718718
906	14	2	short-term-2	1	\N	2025-05-16 19:23:32.731298	2025-05-16 19:23:32.731301
911	15	2	inverse-long-term-3	1	\N	2025-05-16 19:23:32.744534	2025-05-16 19:23:32.744539
916	14	2	stakeholder-name-6	Charles	\N	2025-05-16 19:23:32.757988	2025-05-16 19:23:32.757991
921	15	2	ranked-long-term	35.71	\N	2025-05-16 19:23:32.770191	2025-05-16 19:23:32.770195
926	14	2	stakeholder-directly-1	directly	\N	2025-05-16 19:23:32.783351	2025-05-16 19:23:32.783354
931	15	2	inverse-short-term-2	4	\N	2025-05-16 19:23:32.796204	2025-05-16 19:23:32.796207
936	14	2	long-term-4	1	\N	2025-05-16 19:23:32.808743	2025-05-16 19:23:32.808747
941	15	2	stakeholder-directly-6	directly	\N	2025-05-16 19:23:32.821706	2025-05-16 19:23:32.821709
946	14	3	pain-0	7	\N	2025-05-16 19:23:32.833986	2025-05-16 19:23:32.833989
951	15	3	pain-1	8	\N	2025-05-16 19:23:32.84679	2025-05-16 19:23:32.846793
956	14	3	pleasure-2	1	\N	2025-05-16 19:23:32.859155	2025-05-16 19:23:32.859158
961	15	3	pleasure-3	2	\N	2025-05-16 19:23:32.871723	2025-05-16 19:23:32.871727
966	14	3	pain-6	2	\N	2025-05-16 19:23:32.884491	2025-05-16 19:23:32.884494
971	15	3	total-pleasure	175	\N	2025-05-16 19:23:32.896338	2025-05-16 19:23:32.896341
976	14	3	cumulative-score	10	\N	2025-05-16 19:23:32.908932	2025-05-16 19:23:32.908935
981	15	4	mill-pleasure-0	1	\N	2025-05-16 19:23:32.921078	2025-05-16 19:23:32.921081
986	14	4	mill-pain-2	7	\N	2025-05-16 19:23:32.932746	2025-05-16 19:23:32.932749
991	15	4	mill-pain-3	7	\N	2025-05-16 19:23:32.944867	2025-05-16 19:23:32.944871
996	14	4	mill-pain-5	2	\N	2025-05-16 19:23:32.956646	2025-05-16 19:23:32.956649
1001	15	4	mill-pleasure-6	6	\N	2025-05-16 19:23:32.970495	2025-05-16 19:23:32.970499
1006	14	4	mill-total-pain	176	\N	2025-05-16 19:23:32.983262	2025-05-16 19:23:32.983266
1011	15	4	cumulative-score	0	\N	2025-05-16 19:23:32.996447	2025-05-16 19:23:32.99645
1016	14	8	fidelity-slider-2	2	\N	2025-05-16 19:23:33.009592	2025-05-16 19:23:33.009596
1021	14	8	topic-1-dva	Not really	\N	2025-05-16 19:23:33.022379	2025-05-16 19:23:33.022383
1026	14	12	slider-1	2	\N	2025-05-16 19:23:33.036325	2025-05-16 19:23:33.036329
1031	14	12	num-sliders	3	\N	2025-05-16 19:23:33.050646	2025-05-16 19:23:33.050651
1036	14	11	stakeholder-directly-2	false	\N	2025-05-16 19:23:33.063988	2025-05-16 19:23:33.063991
1041	14	11	ableism-5	5	\N	2025-05-16 19:23:33.077634	2025-05-16 19:23:33.077638
1046	14	11	racism-1	5	\N	2025-05-16 19:23:33.091454	2025-05-16 19:23:33.091458
1051	14	11	stakeholder-directly-5	false	\N	2025-05-16 19:23:33.105027	2025-05-16 19:23:33.105031
1056	14	11	stakeholder-name-1	Jim	\N	2025-05-16 19:23:33.118376	2025-05-16 19:23:33.118381
1061	14	11	racism-4	7	\N	2025-05-16 19:23:33.132026	2025-05-16 19:23:33.13203
1066	14	11	sexism-0	15	\N	2025-05-16 19:23:33.145028	2025-05-16 19:23:33.145032
1071	14	11	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:33.157539	2025-05-16 19:23:33.157543
1076	14	11	stakeholder-name-0	Bob	\N	2025-05-16 19:23:33.170881	2025-05-16 19:23:33.170885
1081	14	11	sexism-3	13	\N	2025-05-16 19:23:33.182932	2025-05-16 19:23:33.182935
1086	14	11	results-1	its good	\N	2025-05-16 19:23:33.195694	2025-05-16 19:23:33.195701
1091	14	14	response-2-lp	sometimes	\N	2025-05-16 19:23:33.209761	2025-05-16 19:23:33.209764
1096	14	14	cumulative-score	NaN	\N	2025-05-16 19:23:33.222838	2025-05-16 19:23:33.222842
1101	14	7	moral-duty-3	be neutral	\N	2025-05-16 19:23:33.236819	2025-05-16 19:23:33.236823
1106	14	15	slider-reverence-for-life-value	7	\N	2025-05-16 19:23:33.249447	2025-05-16 19:23:33.24945
1111	14	15	slider-society-responsibility	3	\N	2025-05-16 19:23:33.261944	2025-05-16 19:23:33.261947
1116	14	15	slider-reverence-for-place-value	2	\N	2025-05-16 19:23:33.275064	2025-05-16 19:23:33.275067
1121	14	13	domain-1	thing 1	\N	2025-05-16 19:23:33.28873	2025-05-16 19:23:33.288734
1126	14	13	vice-3	10	\N	2025-05-16 19:23:33.303023	2025-05-16 19:23:33.303027
1131	14	13	question-ve	yes	\N	2025-05-16 19:23:33.316498	2025-05-16 19:23:33.316501
1138	20	1	dilemma-1	false	\N	2025-05-16 20:12:01.473132	2025-05-16 20:12:01.473139
1148	20	1	gather-facts-3	yesterday	\N	2025-05-16 20:12:01.504773	2025-05-16 20:12:01.504778
1158	20	1	stakeholder-directly-1	directly	\N	2025-05-16 20:12:01.533706	2025-05-16 20:12:01.53371
1168	20	1	stakeholder-directly-4	false	\N	2025-05-16 20:12:01.561495	2025-05-16 20:12:01.561499
1178	20	1	harm-no-1	false	\N	2025-05-16 20:12:01.590265	2025-05-16 20:12:01.59027
1188	20	1	tentative-choice-2	false	\N	2025-05-16 20:12:01.619653	2025-05-16 20:12:01.619657
700	15	1	stakeholder-directly-3	directly	\N	2025-05-16 19:23:32.068957	2025-05-16 19:23:32.068961
705	14	1	stakeholder-indirectly-6	false	\N	2025-05-16 19:23:32.083507	2025-05-16 19:23:32.083512
710	15	1	reversible-yes-0	yes	\N	2025-05-16 19:23:32.097414	2025-05-16 19:23:32.097418
715	14	1	publicity-yes-2	yes	\N	2025-05-16 19:23:32.112638	2025-05-16 19:23:32.112642
720	15	1	reversible-no-4	false	\N	2025-05-16 19:23:32.126774	2025-05-16 19:23:32.126778
725	14	1	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:32.141033	2025-05-16 19:23:32.141038
730	15	1	option-description-2	Do lots	\N	2025-05-16 19:23:32.156066	2025-05-16 19:23:32.15607
735	14	1	reversible-no-0	false	\N	2025-05-16 19:23:32.170793	2025-05-16 19:23:32.170815
740	15	1	publicity-yes-3	false	\N	2025-05-16 19:23:32.190355	2025-05-16 19:23:32.190358
745	14	1	tentative-choice-0	false	\N	2025-05-16 19:23:32.2042	2025-05-16 19:23:32.204206
750	15	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:32.22046	2025-05-16 19:23:32.220464
755	14	1	option-title-3	Get help	\N	2025-05-16 19:23:32.234611	2025-05-16 19:23:32.234615
760	15	1	reversible-no-1	false	\N	2025-05-16 19:23:32.248726	2025-05-16 19:23:32.24873
765	14	1	publicity-no-3	no	\N	2025-05-16 19:23:32.262069	2025-05-16 19:23:32.262073
773	14	10	attentiveness-0	6	\N	2025-05-16 19:23:32.302923	2025-05-16 19:23:32.302928
778	14	10	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:32.334076	2025-05-16 19:23:32.334082
783	14	10	stakeholder-directly-2	false	\N	2025-05-16 19:23:32.363063	2025-05-16 19:23:32.363071
788	14	10	competence-3	8	\N	2025-05-16 19:23:32.390079	2025-05-16 19:23:32.390085
793	14	10	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:32.40344	2025-05-16 19:23:32.403444
798	14	10	results-2-ce	yes	\N	2025-05-16 19:23:32.422031	2025-05-16 19:23:32.422038
803	14	10	attentiveness-6	8	\N	2025-05-16 19:23:32.451745	2025-05-16 19:23:32.45175
808	14	10	responsiveness-5	8	\N	2025-05-16 19:23:32.469771	2025-05-16 19:23:32.469775
813	14	10	stakeholder-directly-5	false	\N	2025-05-16 19:23:32.482776	2025-05-16 19:23:32.482779
818	14	5	primary-virtue-always	be honest	\N	2025-05-16 19:23:32.496127	2025-05-16 19:23:32.496132
823	15	5	universalizability-pass	false	\N	2025-05-16 19:23:32.508958	2025-05-16 19:23:32.508961
828	14	5	consistency-fail	false	\N	2025-05-16 19:23:32.521397	2025-05-16 19:23:32.521401
833	15	2	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:32.536481	2025-05-16 19:23:32.536485
838	14	2	short-term-3	1	\N	2025-05-16 19:23:32.553032	2025-05-16 19:23:32.553035
843	15	2	inverse-long-term-4	4	\N	2025-05-16 19:23:32.565897	2025-05-16 19:23:32.565901
848	14	2	unranked-short-term	42.86	\N	2025-05-16 19:23:32.578691	2025-05-16 19:23:32.578695
853	15	2	stakeholder-name-0	Bob	\N	2025-05-16 19:23:32.591218	2025-05-16 19:23:32.591222
858	14	2	stakeholder-directly-2	false	\N	2025-05-16 19:23:32.603883	2025-05-16 19:23:32.603887
863	15	2	inverse-short-term-3	4	\N	2025-05-16 19:23:32.616257	2025-05-16 19:23:32.61626
868	14	2	long-term-5	5	\N	2025-05-16 19:23:32.628706	2025-05-16 19:23:32.62871
873	15	2	unranked-long-term	34.29	\N	2025-05-16 19:23:32.6417	2025-05-16 19:23:32.641703
878	14	2	inverse-long-term-0	1	\N	2025-05-16 19:23:32.654696	2025-05-16 19:23:32.6547
883	15	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:32.668178	2025-05-16 19:23:32.668181
888	14	2	short-term-4	5	\N	2025-05-16 19:23:32.681019	2025-05-16 19:23:32.681023
893	15	2	inverse-long-term-5	0	\N	2025-05-16 19:23:32.694416	2025-05-16 19:23:32.694421
898	14	2	cumulative-score	0	\N	2025-05-16 19:23:32.709514	2025-05-16 19:23:32.709518
903	15	2	stakeholder-name-1	Jim	\N	2025-05-16 19:23:32.723844	2025-05-16 19:23:32.723848
908	14	2	stakeholder-directly-3	directly	\N	2025-05-16 19:23:32.736701	2025-05-16 19:23:32.736705
913	15	2	inverse-short-term-4	0	\N	2025-05-16 19:23:32.750078	2025-05-16 19:23:32.750083
918	14	2	long-term-6	4	\N	2025-05-16 19:23:32.763033	2025-05-16 19:23:32.763036
923	15	2	num_stakeholders	7	\N	2025-05-16 19:23:32.775618	2025-05-16 19:23:32.775622
928	14	2	inverse-long-term-1	1	\N	2025-05-16 19:23:32.788241	2025-05-16 19:23:32.788245
933	15	2	stakeholder-indirectly-3	false	\N	2025-05-16 19:23:32.801168	2025-05-16 19:23:32.801171
938	14	2	short-term-5	4	\N	2025-05-16 19:23:32.81399	2025-05-16 19:23:32.813995
943	15	2	inverse-long-term-6	1	\N	2025-05-16 19:23:32.826532	2025-05-16 19:23:32.826535
948	14	3	pleasure-0	7	\N	2025-05-16 19:23:32.839303	2025-05-16 19:23:32.839307
953	15	3	pleasure-1	7	\N	2025-05-16 19:23:32.851756	2025-05-16 19:23:32.851759
958	14	3	pain-3	2	\N	2025-05-16 19:23:32.863925	2025-05-16 19:23:32.863928
963	15	3	pleasure-4	8	\N	2025-05-16 19:23:32.877033	2025-05-16 19:23:32.877036
968	14	3	pleasure-6	7	\N	2025-05-16 19:23:32.889314	2025-05-16 19:23:32.889318
973	15	3	total-pain	66	\N	2025-05-16 19:23:32.901292	2025-05-16 19:23:32.901296
978	14	4	mill-pain-0	3	\N	2025-05-16 19:23:32.913897	2025-05-16 19:23:32.913901
983	15	4	mill-pain-1	3	\N	2025-05-16 19:23:32.92574	2025-05-16 19:23:32.925744
988	14	4	mill-pleasure-2	2	\N	2025-05-16 19:23:32.937821	2025-05-16 19:23:32.937824
993	15	4	mill-pleasure-3	7	\N	2025-05-16 19:23:32.949613	2025-05-16 19:23:32.949617
998	14	4	mill-pain-6	8	\N	2025-05-16 19:23:32.961914	2025-05-16 19:23:32.961917
1003	15	4	reflection	yes	\N	2025-05-16 19:23:32.975693	2025-05-16 19:23:32.975696
1008	14	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 19:23:32.988601	2025-05-16 19:23:32.988605
1013	14	6	decision-response	yes	\N	2025-05-16 19:23:33.001543	2025-05-16 19:23:33.001548
1018	14	8	reparation-slider-2	2	\N	2025-05-16 19:23:33.014723	2025-05-16 19:23:33.014727
1023	14	8	percentage-action-taken	65	\N	2025-05-16 19:23:33.027721	2025-05-16 19:23:33.027726
1028	14	12	topic-sg-0	it just is	\N	2025-05-16 19:23:33.041792	2025-05-16 19:23:33.041813
1033	14	11	num_stakeholders	7	\N	2025-05-16 19:23:33.056044	2025-05-16 19:23:33.056052
1038	14	11	racism-3	13	\N	2025-05-16 19:23:33.069287	2025-05-16 19:23:33.06929
1043	14	11	results-2	neither	\N	2025-05-16 19:23:33.083217	2025-05-16 19:23:33.083222
1048	14	11	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:33.09703	2025-05-16 19:23:33.097034
1053	14	11	racism-6	16	\N	2025-05-16 19:23:33.110292	2025-05-16 19:23:33.110296
1058	14	11	sexism-2	6	\N	2025-05-16 19:23:33.123499	2025-05-16 19:23:33.123503
1063	14	11	stakeholder-name-6	Charles	\N	2025-05-16 19:23:33.137218	2025-05-16 19:23:33.137222
1068	14	11	ageism-1	6	\N	2025-05-16 19:23:33.150202	2025-05-16 19:23:33.150206
1073	14	11	sexism-5	14	\N	2025-05-16 19:23:33.163354	2025-05-16 19:23:33.163357
1078	14	11	stakeholder-indirectly-1	false	\N	2025-05-16 19:23:33.175817	2025-05-16 19:23:33.17582
1083	14	11	ageism-4	17	\N	2025-05-16 19:23:33.187678	2025-05-16 19:23:33.187682
1088	14	14	slider-value-1	8	\N	2025-05-16 19:23:33.201556	2025-05-16 19:23:33.201561
1093	14	14	slider-scale-1	Hatred,Loving Kindness	\N	2025-05-16 19:23:33.214974	2025-05-16 19:23:33.214977
1098	14	7	slider-1	1	\N	2025-05-16 19:23:33.228277	2025-05-16 19:23:33.22828
1103	14	7	num-sacrifices	3	\N	2025-05-16 19:23:33.241955	2025-05-16 19:23:33.241958
1108	14	15	slider-interdependence-value	7	\N	2025-05-16 19:23:33.254327	2025-05-16 19:23:33.25433
1113	14	15	slider-global-justice	0	\N	2025-05-16 19:23:33.267123	2025-05-16 19:23:33.267127
1118	14	15	reflection-1-up	yes they always are	\N	2025-05-16 19:23:33.28041	2025-05-16 19:23:33.280413
1123	14	13	domain-2	thing 2	\N	2025-05-16 19:23:33.294376	2025-05-16 19:23:33.294379
1128	14	13	vice-4	3	\N	2025-05-16 19:23:33.308471	2025-05-16 19:23:33.308475
1133	14	13	num-domains	5	\N	2025-05-16 19:23:33.322475	2025-05-16 19:23:33.322479
1144	20	1	gather-facts-1	because reasons	\N	2025-05-16 20:12:01.493153	2025-05-16 20:12:01.493162
1154	20	1	stakeholder-indirectly-0	false	\N	2025-05-16 20:12:01.52228	2025-05-16 20:12:01.522286
1164	20	1	stakeholder-directly-2	false	\N	2025-05-16 20:12:01.550329	2025-05-16 20:12:01.550333
1174	20	1	option-description-3	get some help	\N	2025-05-16 20:12:01.579412	2025-05-16 20:12:01.579418
1184	20	1	reversible-yes-3	false	\N	2025-05-16 20:12:01.606935	2025-05-16 20:12:01.606939
1192	20	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:12:01.631504	2025-05-16 20:12:01.631509
701	14	1	stakeholder-directly-3	directly	\N	2025-05-16 19:23:32.071747	2025-05-16 19:23:32.071753
706	15	1	option-title-2	Do lots 	\N	2025-05-16 19:23:32.086359	2025-05-16 19:23:32.086363
711	14	1	reversible-yes-0	yes	\N	2025-05-16 19:23:32.100179	2025-05-16 19:23:32.100183
716	15	1	harm-no-3	no	\N	2025-05-16 19:23:32.115441	2025-05-16 19:23:32.115445
721	14	1	reversible-no-4	false	\N	2025-05-16 19:23:32.129501	2025-05-16 19:23:32.129506
726	15	1	stakeholder-directly-5	false	\N	2025-05-16 19:23:32.143684	2025-05-16 19:23:32.143688
731	14	1	option-description-2	Do lots	\N	2025-05-16 19:23:32.15874	2025-05-16 19:23:32.158744
736	15	1	reversible-yes-1	yes	\N	2025-05-16 19:23:32.174131	2025-05-16 19:23:32.174136
741	14	1	publicity-yes-3	false	\N	2025-05-16 19:23:32.193068	2025-05-16 19:23:32.193071
746	15	1	num_stakeholders	7	\N	2025-05-16 19:23:32.20725	2025-05-16 19:23:32.207255
751	14	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:32.223153	2025-05-16 19:23:32.223157
756	15	1	harm-no-0	false	\N	2025-05-16 19:23:32.237735	2025-05-16 19:23:32.237738
761	14	1	reversible-no-1	false	\N	2025-05-16 19:23:32.251375	2025-05-16 19:23:32.251379
766	15	1	publicity-yes-4	yes	\N	2025-05-16 19:23:32.264815	2025-05-16 19:23:32.264819
774	14	10	competence-0	8	\N	2025-05-16 19:23:32.305622	2025-05-16 19:23:32.305627
779	14	10	attentiveness-1	8	\N	2025-05-16 19:23:32.337327	2025-05-16 19:23:32.337331
784	14	10	stakeholder-indirectly-2	indirectly	\N	2025-05-16 19:23:32.368015	2025-05-16 19:23:32.368022
789	14	10	attentiveness-4	8	\N	2025-05-16 19:23:32.392822	2025-05-16 19:23:32.392827
794	14	10	responsiveness-3	2	\N	2025-05-16 19:23:32.406051	2025-05-16 19:23:32.406054
799	14	10	stakeholder-directly-3	directly	\N	2025-05-16 19:23:32.431117	2025-05-16 19:23:32.431126
804	14	10	num_stakeholders	7	\N	2025-05-16 19:23:32.457112	2025-05-16 19:23:32.457119
809	14	10	competence-6	9	\N	2025-05-16 19:23:32.472367	2025-05-16 19:23:32.47237
814	14	10	stakeholder-name-6	Charles	\N	2025-05-16 19:23:32.485389	2025-05-16 19:23:32.485394
819	15	5	primary-virtue-always	be honest	\N	2025-05-16 19:23:32.498889	2025-05-16 19:23:32.498892
824	14	5	universalizability-fail	fail	\N	2025-05-16 19:23:32.511613	2025-05-16 19:23:32.511617
829	15	5	consistency-fail	false	\N	2025-05-16 19:23:32.523845	2025-05-16 19:23:32.523849
834	14	2	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:32.538968	2025-05-16 19:23:32.538972
839	15	2	short-term-3	1	\N	2025-05-16 19:23:32.555618	2025-05-16 19:23:32.555622
844	14	2	inverse-short-term-5	1	\N	2025-05-16 19:23:32.56855	2025-05-16 19:23:32.568554
849	15	2	unranked-short-term	42.86	\N	2025-05-16 19:23:32.58118	2025-05-16 19:23:32.581183
854	14	2	long-term-0	4	\N	2025-05-16 19:23:32.593903	2025-05-16 19:23:32.593906
859	15	2	stakeholder-directly-2	false	\N	2025-05-16 19:23:32.606355	2025-05-16 19:23:32.606359
864	14	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:32.618721	2025-05-16 19:23:32.618725
869	15	2	long-term-5	5	\N	2025-05-16 19:23:32.631233	2025-05-16 19:23:32.631237
874	14	2	topic-3	unreliable	\N	2025-05-16 19:23:32.644219	2025-05-16 19:23:32.644224
879	15	2	inverse-long-term-0	1	\N	2025-05-16 19:23:32.65741	2025-05-16 19:23:32.657415
884	14	2	stakeholder-name-3	Samantha	\N	2025-05-16 19:23:32.670689	2025-05-16 19:23:32.670693
889	15	2	short-term-4	5	\N	2025-05-16 19:23:32.683695	2025-05-16 19:23:32.683699
894	14	2	inverse-short-term-6	4	\N	2025-05-16 19:23:32.697124	2025-05-16 19:23:32.697128
899	15	2	cumulative-score	0	\N	2025-05-16 19:23:32.712203	2025-05-16 19:23:32.712207
904	14	2	long-term-1	4	\N	2025-05-16 19:23:32.726328	2025-05-16 19:23:32.726332
909	15	2	stakeholder-directly-3	directly	\N	2025-05-16 19:23:32.739355	2025-05-16 19:23:32.739358
914	14	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 19:23:32.752622	2025-05-16 19:23:32.752625
919	15	2	long-term-6	4	\N	2025-05-16 19:23:32.765347	2025-05-16 19:23:32.76535
924	14	2	short-term-0	4	\N	2025-05-16 19:23:32.778257	2025-05-16 19:23:32.778261
929	15	2	inverse-long-term-1	1	\N	2025-05-16 19:23:32.790602	2025-05-16 19:23:32.790606
934	14	2	stakeholder-name-4	Jeff	\N	2025-05-16 19:23:32.803492	2025-05-16 19:23:32.803495
939	15	2	short-term-5	4	\N	2025-05-16 19:23:32.816513	2025-05-16 19:23:32.816517
944	14	2	topic-1	bad	\N	2025-05-16 19:23:32.828972	2025-05-16 19:23:32.828976
949	15	3	pleasure-0	7	\N	2025-05-16 19:23:32.841823	2025-05-16 19:23:32.841827
954	14	3	pain-2	8	\N	2025-05-16 19:23:32.854249	2025-05-16 19:23:32.854252
959	15	3	pain-3	2	\N	2025-05-16 19:23:32.866473	2025-05-16 19:23:32.866476
964	14	3	pain-5	8	\N	2025-05-16 19:23:32.879474	2025-05-16 19:23:32.879478
969	15	3	pleasure-6	7	\N	2025-05-16 19:23:32.891657	2025-05-16 19:23:32.891661
974	14	3	pleasure-pain-ratio	73	\N	2025-05-16 19:23:32.903943	2025-05-16 19:23:32.903947
979	15	4	mill-pain-0	3	\N	2025-05-16 19:23:32.916279	2025-05-16 19:23:32.916283
984	14	4	mill-pleasure-1	2	\N	2025-05-16 19:23:32.928119	2025-05-16 19:23:32.928123
989	15	4	mill-pleasure-2	2	\N	2025-05-16 19:23:32.940158	2025-05-16 19:23:32.940161
994	14	4	mill-pleasure-4	2	\N	2025-05-16 19:23:32.952032	2025-05-16 19:23:32.952035
999	15	4	mill-pain-6	8	\N	2025-05-16 19:23:32.964414	2025-05-16 19:23:32.964418
1004	14	4	mill-total-pleasure	84	\N	2025-05-16 19:23:32.978141	2025-05-16 19:23:32.978144
1009	15	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 19:23:32.991261	2025-05-16 19:23:32.991265
1014	14	6	better-world-response	probably	\N	2025-05-16 19:23:33.004322	2025-05-16 19:23:33.004326
1019	14	8	gratitude-slider-1	8	\N	2025-05-16 19:23:33.017393	2025-05-16 19:23:33.017397
1024	14	8	cumulative-score	7	\N	2025-05-16 19:23:33.030434	2025-05-16 19:23:33.030437
1029	14	12	topic-sg-1	kind of	\N	2025-05-16 19:23:33.044749	2025-05-16 19:23:33.044755
1034	14	11	ableism-0	15	\N	2025-05-16 19:23:33.05871	2025-05-16 19:23:33.058714
1039	14	11	stakeholder-indirectly-4	indirectly	\N	2025-05-16 19:23:33.071965	2025-05-16 19:23:33.071969
1044	14	11	stakeholder-directly-0	directly	\N	2025-05-16 19:23:33.085868	2025-05-16 19:23:33.085872
1049	14	11	ableism-3	13	\N	2025-05-16 19:23:33.099718	2025-05-16 19:23:33.099723
1054	14	11	results-3	probably	\N	2025-05-16 19:23:33.113004	2025-05-16 19:23:33.113008
1059	14	11	stakeholder-directly-3	directly	\N	2025-05-16 19:23:33.126199	2025-05-16 19:23:33.126203
1064	14	11	ableism-6	3	\N	2025-05-16 19:23:33.139763	2025-05-16 19:23:33.139767
1069	14	11	racism-2	15	\N	2025-05-16 19:23:33.152706	2025-05-16 19:23:33.15271
1074	14	11	stakeholder-directly-6	directly	\N	2025-05-16 19:23:33.165958	2025-05-16 19:23:33.165962
1079	14	11	stakeholder-name-2	Cindy	\N	2025-05-16 19:23:33.178194	2025-05-16 19:23:33.178197
1084	14	11	racism-5	12	\N	2025-05-16 19:23:33.190018	2025-05-16 19:23:33.190022
1089	14	14	slider-value-2	9	\N	2025-05-16 19:23:33.204228	2025-05-16 19:23:33.204232
1094	14	14	slider-scale-2	Greed,Generosity	\N	2025-05-16 19:23:33.217547	2025-05-16 19:23:33.21755
1099	14	7	moral-duty-2	be bad	\N	2025-05-16 19:23:33.231153	2025-05-16 19:23:33.231157
1104	14	7	average-sacrifice	5	\N	2025-05-16 19:23:33.24439	2025-05-16 19:23:33.244394
1109	14	15	slider-interdependence	3	\N	2025-05-16 19:23:33.256739	2025-05-16 19:23:33.256744
1114	14	15	slider-environmental-stewardship-value	2	\N	2025-05-16 19:23:33.269742	2025-05-16 19:23:33.269745
1119	14	15	reflection-2-up	people are different	\N	2025-05-16 19:23:33.28307	2025-05-16 19:23:33.283073
1124	14	13	vice-2	5	\N	2025-05-16 19:23:33.297073	2025-05-16 19:23:33.297077
1129	14	13	domain-5	thing 5	\N	2025-05-16 19:23:33.311103	2025-05-16 19:23:33.311107
1134	14	13	vv-average	5	\N	2025-05-16 19:23:33.325447	2025-05-16 19:23:33.325451
1140	20	1	dilemma-2	false	\N	2025-05-16 20:12:01.479195	2025-05-16 20:12:01.479201
1150	20	1	stakeholder-name-0	Bob	\N	2025-05-16 20:12:01.510116	2025-05-16 20:12:01.51012
1160	20	1	stakeholder-indirectly-1	false	\N	2025-05-16 20:12:01.539123	2025-05-16 20:12:01.539128
1170	20	1	stakeholder-name-6	Charles	\N	2025-05-16 20:12:01.567517	2025-05-16 20:12:01.567522
1180	20	1	harm-yes-2	yes	\N	2025-05-16 20:12:01.595774	2025-05-16 20:12:01.595778
1190	20	1	stakeholder-name-3	Samantha	\N	2025-05-16 20:12:01.625097	2025-05-16 20:12:01.625103
2207	29	1	dilemma-1	7	\N	2025-05-16 20:32:57.112552	2025-05-16 20:32:57.0983
2211	29	1	gather-facts-2		\N	2025-05-16 20:32:57.119034	2025-05-16 20:32:57.0983
2215	29	1	stakeholder-indirectly-0	false	\N	2025-05-16 20:32:57.1241	2025-05-16 20:32:57.0983
2219	29	1	stakeholder-name-2		\N	2025-05-16 20:32:57.129912	2025-05-16 20:32:57.0983
2223	29	1	stakeholder-directly-3	false	\N	2025-05-16 20:32:57.135127	2025-05-16 20:32:57.0983
2227	29	1	stakeholder-indirectly-4	false	\N	2025-05-16 20:32:57.141592	2025-05-16 20:32:57.0983
2231	29	1	stakeholder-name-6		\N	2025-05-16 20:32:57.146859	2025-05-16 20:32:57.0983
1194	20	1	stakeholder-directly-6	directly	\N	2025-05-16 20:12:01.637306	2025-05-16 20:12:01.637312
1204	20	1	harm-no-2	false	\N	2025-05-16 20:12:01.665816	2025-05-16 20:12:01.665821
1214	20	1	stakeholder-directly-3	directly	\N	2025-05-16 20:12:01.693142	2025-05-16 20:12:01.693146
1224	20	1	reversible-yes-0	yes	\N	2025-05-16 20:12:01.721402	2025-05-16 20:12:01.721407
1234	20	1	reversible-no-4	false	\N	2025-05-16 20:12:01.748826	2025-05-16 20:12:01.74883
1244	20	1	option-description-2	Do lots	\N	2025-05-16 20:12:01.776708	2025-05-16 20:12:01.776714
1254	20	1	publicity-yes-3	false	\N	2025-05-16 20:12:01.805413	2025-05-16 20:12:01.805417
1264	20	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:12:01.832302	2025-05-16 20:12:01.832306
1274	20	1	reversible-no-1	false	\N	2025-05-16 20:12:01.860705	2025-05-16 20:12:01.860709
1287	19	10	attentiveness-0	6	\N	2025-05-16 20:12:01.927255	2025-05-16 20:12:01.927266
1292	19	10	stakeholder-indirectly-1	false	\N	2025-05-16 20:12:01.948556	2025-05-16 20:12:01.948562
1297	19	10	stakeholder-directly-2	false	\N	2025-05-16 20:12:01.977172	2025-05-16 20:12:01.97718
1302	19	10	competence-3	8	\N	2025-05-16 20:12:01.99269	2025-05-16 20:12:01.992694
1307	19	10	stakeholder-name-3	Samantha	\N	2025-05-16 20:12:02.014115	2025-05-16 20:12:02.014124
1312	19	10	results-2-ce	yes	\N	2025-05-16 20:12:02.037644	2025-05-16 20:12:02.037651
1317	19	10	attentiveness-6	8	\N	2025-05-16 20:12:02.0659	2025-05-16 20:12:02.065908
1322	19	10	responsiveness-5	8	\N	2025-05-16 20:12:02.080716	2025-05-16 20:12:02.080722
1327	19	10	stakeholder-directly-5	false	\N	2025-05-16 20:12:02.099691	2025-05-16 20:12:02.099698
1332	19	5	primary-virtue-always	be honest	\N	2025-05-16 20:12:02.11384	2025-05-16 20:12:02.113845
1337	20	5	universalizability-pass	false	\N	2025-05-16 20:12:02.127874	2025-05-16 20:12:02.127878
1342	19	5	consistency-fail	false	\N	2025-05-16 20:12:02.140591	2025-05-16 20:12:02.140594
1347	20	2	stakeholder-indirectly-1	false	\N	2025-05-16 20:12:02.152888	2025-05-16 20:12:02.152891
1352	19	2	short-term-3	1	\N	2025-05-16 20:12:02.165375	2025-05-16 20:12:02.165379
1357	20	2	inverse-long-term-4	4	\N	2025-05-16 20:12:02.178964	2025-05-16 20:12:02.178969
1362	19	2	unranked-short-term	42.86	\N	2025-05-16 20:12:02.193661	2025-05-16 20:12:02.193666
1367	20	2	stakeholder-name-0	Bob	\N	2025-05-16 20:12:02.206406	2025-05-16 20:12:02.20641
1372	19	2	stakeholder-directly-2	false	\N	2025-05-16 20:12:02.219373	2025-05-16 20:12:02.219377
1377	20	2	inverse-short-term-3	4	\N	2025-05-16 20:12:02.232553	2025-05-16 20:12:02.232557
1382	19	2	long-term-5	5	\N	2025-05-16 20:12:02.245127	2025-05-16 20:12:02.245131
1387	20	2	unranked-long-term	34.29	\N	2025-05-16 20:12:02.258465	2025-05-16 20:12:02.25847
1392	19	2	inverse-long-term-0	1	\N	2025-05-16 20:12:02.271409	2025-05-16 20:12:02.271413
1397	20	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:12:02.284521	2025-05-16 20:12:02.284537
1402	19	2	short-term-4	5	\N	2025-05-16 20:12:02.297176	2025-05-16 20:12:02.29718
1407	20	2	inverse-long-term-5	0	\N	2025-05-16 20:12:02.309192	2025-05-16 20:12:02.309196
1412	19	2	cumulative-score	0	\N	2025-05-16 20:12:02.322111	2025-05-16 20:12:02.322114
1417	20	2	stakeholder-name-1	Jim	\N	2025-05-16 20:12:02.337987	2025-05-16 20:12:02.337992
1422	19	2	stakeholder-directly-3	directly	\N	2025-05-16 20:12:02.351358	2025-05-16 20:12:02.351363
1427	20	2	inverse-short-term-4	0	\N	2025-05-16 20:12:02.365284	2025-05-16 20:12:02.365289
1432	19	2	long-term-6	4	\N	2025-05-16 20:12:02.377496	2025-05-16 20:12:02.3775
1437	20	2	num_stakeholders	7	\N	2025-05-16 20:12:02.389764	2025-05-16 20:12:02.389767
1442	19	2	inverse-long-term-1	1	\N	2025-05-16 20:12:02.401505	2025-05-16 20:12:02.401508
1447	20	2	stakeholder-indirectly-3	false	\N	2025-05-16 20:12:02.415928	2025-05-16 20:12:02.415934
1452	19	2	short-term-5	4	\N	2025-05-16 20:12:02.429824	2025-05-16 20:12:02.429828
1457	20	2	inverse-long-term-6	1	\N	2025-05-16 20:12:02.442921	2025-05-16 20:12:02.442925
1462	19	3	pleasure-0	7	\N	2025-05-16 20:12:02.456015	2025-05-16 20:12:02.456018
1467	20	3	pleasure-1	7	\N	2025-05-16 20:12:02.468347	2025-05-16 20:12:02.46835
1472	19	3	pain-3	2	\N	2025-05-16 20:12:02.482726	2025-05-16 20:12:02.482732
1477	20	3	pleasure-4	8	\N	2025-05-16 20:12:02.495333	2025-05-16 20:12:02.495337
1482	19	3	pleasure-6	7	\N	2025-05-16 20:12:02.507694	2025-05-16 20:12:02.507697
1487	20	3	total-pain	66	\N	2025-05-16 20:12:02.522094	2025-05-16 20:12:02.522098
1492	19	4	mill-pain-0	3	\N	2025-05-16 20:12:02.538644	2025-05-16 20:12:02.538649
1497	20	4	mill-pain-1	3	\N	2025-05-16 20:12:02.55147	2025-05-16 20:12:02.551474
1502	19	4	mill-pleasure-2	2	\N	2025-05-16 20:12:02.563693	2025-05-16 20:12:02.563696
1507	20	4	mill-pleasure-3	7	\N	2025-05-16 20:12:02.579581	2025-05-16 20:12:02.579586
1512	19	4	mill-pain-6	8	\N	2025-05-16 20:12:02.5939	2025-05-16 20:12:02.593904
1517	20	4	reflection	yes	\N	2025-05-16 20:12:02.607902	2025-05-16 20:12:02.607907
1522	19	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 20:12:02.620924	2025-05-16 20:12:02.620928
1527	19	6	decision-response	yes	\N	2025-05-16 20:12:02.636307	2025-05-16 20:12:02.636313
1532	19	8	reparation-slider-2	2	\N	2025-05-16 20:12:02.65155	2025-05-16 20:12:02.651555
1537	19	8	percentage-action-taken	65	\N	2025-05-16 20:12:02.665432	2025-05-16 20:12:02.665437
1542	19	12	topic-sg-0	it just is	\N	2025-05-16 20:12:02.678953	2025-05-16 20:12:02.678957
1547	19	11	num_stakeholders	7	\N	2025-05-16 20:12:02.692121	2025-05-16 20:12:02.692125
1552	19	11	racism-3	13	\N	2025-05-16 20:12:02.705258	2025-05-16 20:12:02.705262
1557	19	11	results-2	neither	\N	2025-05-16 20:12:02.718443	2025-05-16 20:12:02.718447
1562	19	11	stakeholder-name-3	Samantha	\N	2025-05-16 20:12:02.73364	2025-05-16 20:12:02.733646
1567	19	11	racism-6	16	\N	2025-05-16 20:12:02.746542	2025-05-16 20:12:02.746546
1572	19	11	sexism-2	6	\N	2025-05-16 20:12:02.75951	2025-05-16 20:12:02.759514
1577	19	11	stakeholder-name-6	Charles	\N	2025-05-16 20:12:02.772321	2025-05-16 20:12:02.772325
1582	19	11	ageism-1	6	\N	2025-05-16 20:12:02.785636	2025-05-16 20:12:02.78564
1587	19	11	sexism-5	14	\N	2025-05-16 20:12:02.802252	2025-05-16 20:12:02.802256
1592	19	11	stakeholder-indirectly-1	false	\N	2025-05-16 20:12:02.816052	2025-05-16 20:12:02.816056
1597	19	11	ageism-4	17	\N	2025-05-16 20:12:02.829626	2025-05-16 20:12:02.829631
1602	19	14	slider-value-1	8	\N	2025-05-16 20:12:02.842258	2025-05-16 20:12:02.842262
1607	19	14	slider-scale-1	Hatred,Loving Kindness	\N	2025-05-16 20:12:02.855487	2025-05-16 20:12:02.855493
1612	19	7	slider-1	1	\N	2025-05-16 20:12:02.870038	2025-05-16 20:12:02.870044
1617	19	7	num-sacrifices	3	\N	2025-05-16 20:12:02.884015	2025-05-16 20:12:02.884019
1622	19	15	slider-interdependence-value	7	\N	2025-05-16 20:12:02.900025	2025-05-16 20:12:02.900029
1627	19	15	slider-global-justice	0	\N	2025-05-16 20:12:02.914423	2025-05-16 20:12:02.914427
1632	19	15	reflection-1-up	yes they always are	\N	2025-05-16 20:12:02.92914	2025-05-16 20:12:02.929145
1637	19	13	domain-2	thing 2	\N	2025-05-16 20:12:02.94249	2025-05-16 20:12:02.942493
1642	19	13	vice-4	3	\N	2025-05-16 20:12:02.957112	2025-05-16 20:12:02.957117
1647	19	13	num-domains	5	\N	2025-05-16 20:12:02.970001	2025-05-16 20:12:02.970004
1200	20	1	publicity-no-0	false	\N	2025-05-16 20:12:01.65436	2025-05-16 20:12:01.654365
1210	20	1	reversible-yes-4	yes	\N	2025-05-16 20:12:01.682143	2025-05-16 20:12:01.682147
1220	20	1	option-title-2	Do lots 	\N	2025-05-16 20:12:01.709243	2025-05-16 20:12:01.709248
1230	20	1	harm-no-3	no	\N	2025-05-16 20:12:01.737748	2025-05-16 20:12:01.737752
1240	20	1	stakeholder-directly-5	false	\N	2025-05-16 20:12:01.764418	2025-05-16 20:12:01.764422
1250	20	1	reversible-yes-1	yes	\N	2025-05-16 20:12:01.794462	2025-05-16 20:12:01.794466
1260	20	1	num_stakeholders	7	\N	2025-05-16 20:12:01.821846	2025-05-16 20:12:01.82185
1270	20	1	harm-no-0	false	\N	2025-05-16 20:12:01.849179	2025-05-16 20:12:01.849185
1280	20	1	publicity-yes-4	yes	\N	2025-05-16 20:12:01.888048	2025-05-16 20:12:01.888054
1288	19	10	competence-0	8	\N	2025-05-16 20:12:01.932179	2025-05-16 20:12:01.932186
1293	19	10	attentiveness-1	8	\N	2025-05-16 20:12:01.954955	2025-05-16 20:12:01.954965
1298	19	10	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:12:01.980512	2025-05-16 20:12:01.980519
1303	19	10	attentiveness-4	8	\N	2025-05-16 20:12:01.995718	2025-05-16 20:12:01.995722
1308	19	10	responsiveness-3	2	\N	2025-05-16 20:12:02.017773	2025-05-16 20:12:02.017781
1313	19	10	stakeholder-directly-3	directly	\N	2025-05-16 20:12:02.040765	2025-05-16 20:12:02.040771
1318	19	10	num_stakeholders	7	\N	2025-05-16 20:12:02.068906	2025-05-16 20:12:02.068911
1323	19	10	competence-6	9	\N	2025-05-16 20:12:02.085909	2025-05-16 20:12:02.085919
1328	19	10	stakeholder-name-6	Charles	\N	2025-05-16 20:12:02.102584	2025-05-16 20:12:02.10259
1333	20	5	primary-virtue-always	be honest	\N	2025-05-16 20:12:02.116599	2025-05-16 20:12:02.116604
1338	19	5	universalizability-fail	fail	\N	2025-05-16 20:12:02.130474	2025-05-16 20:12:02.130478
1343	20	5	consistency-fail	false	\N	2025-05-16 20:12:02.143091	2025-05-16 20:12:02.143094
1348	19	2	stakeholder-name-2	Cindy	\N	2025-05-16 20:12:02.155251	2025-05-16 20:12:02.155254
1353	20	2	short-term-3	1	\N	2025-05-16 20:12:02.168019	2025-05-16 20:12:02.168022
1358	19	2	inverse-short-term-5	1	\N	2025-05-16 20:12:02.181433	2025-05-16 20:12:02.181437
1363	20	2	unranked-short-term	42.86	\N	2025-05-16 20:12:02.196319	2025-05-16 20:12:02.196325
1368	19	2	long-term-0	4	\N	2025-05-16 20:12:02.209066	2025-05-16 20:12:02.20907
1373	20	2	stakeholder-directly-2	false	\N	2025-05-16 20:12:02.222079	2025-05-16 20:12:02.222083
1378	19	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:12:02.235161	2025-05-16 20:12:02.235165
1383	20	2	long-term-5	5	\N	2025-05-16 20:12:02.247682	2025-05-16 20:12:02.247686
1388	19	2	topic-3	unreliable	\N	2025-05-16 20:12:02.261239	2025-05-16 20:12:02.261243
1393	20	2	inverse-long-term-0	1	\N	2025-05-16 20:12:02.274058	2025-05-16 20:12:02.274062
1398	19	2	stakeholder-name-3	Samantha	\N	2025-05-16 20:12:02.287081	2025-05-16 20:12:02.287084
1403	20	2	short-term-4	5	\N	2025-05-16 20:12:02.299611	2025-05-16 20:12:02.299614
1408	19	2	inverse-short-term-6	4	\N	2025-05-16 20:12:02.311854	2025-05-16 20:12:02.311858
1413	20	2	cumulative-score	0	\N	2025-05-16 20:12:02.324937	2025-05-16 20:12:02.324941
1418	19	2	long-term-1	4	\N	2025-05-16 20:12:02.340458	2025-05-16 20:12:02.340462
1423	20	2	stakeholder-directly-3	directly	\N	2025-05-16 20:12:02.354095	2025-05-16 20:12:02.3541
1428	19	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:12:02.36774	2025-05-16 20:12:02.367744
1433	20	2	long-term-6	4	\N	2025-05-16 20:12:02.379898	2025-05-16 20:12:02.379901
1438	19	2	short-term-0	4	\N	2025-05-16 20:12:02.392096	2025-05-16 20:12:02.3921
1443	20	2	inverse-long-term-1	1	\N	2025-05-16 20:12:02.403911	2025-05-16 20:12:02.403915
1448	19	2	stakeholder-name-4	Jeff	\N	2025-05-16 20:12:02.419095	2025-05-16 20:12:02.4191
1453	20	2	short-term-5	4	\N	2025-05-16 20:12:02.432336	2025-05-16 20:12:02.432339
1458	19	2	topic-1	bad	\N	2025-05-16 20:12:02.445493	2025-05-16 20:12:02.445497
1463	20	3	pleasure-0	7	\N	2025-05-16 20:12:02.45848	2025-05-16 20:12:02.458483
1468	19	3	pain-2	8	\N	2025-05-16 20:12:02.471179	2025-05-16 20:12:02.471183
1473	20	3	pain-3	2	\N	2025-05-16 20:12:02.485292	2025-05-16 20:12:02.485297
1478	19	3	pain-5	8	\N	2025-05-16 20:12:02.497712	2025-05-16 20:12:02.497717
1483	20	3	pleasure-6	7	\N	2025-05-16 20:12:02.510495	2025-05-16 20:12:02.5105
1488	19	3	pleasure-pain-ratio	73	\N	2025-05-16 20:12:02.524581	2025-05-16 20:12:02.524585
1493	20	4	mill-pain-0	3	\N	2025-05-16 20:12:02.541322	2025-05-16 20:12:02.541327
1498	19	4	mill-pleasure-1	2	\N	2025-05-16 20:12:02.553934	2025-05-16 20:12:02.553937
1503	20	4	mill-pleasure-2	2	\N	2025-05-16 20:12:02.566225	2025-05-16 20:12:02.566231
1508	19	4	mill-pleasure-4	2	\N	2025-05-16 20:12:02.582593	2025-05-16 20:12:02.582598
1513	20	4	mill-pain-6	8	\N	2025-05-16 20:12:02.596691	2025-05-16 20:12:02.596695
1518	19	4	mill-total-pleasure	84	\N	2025-05-16 20:12:02.610474	2025-05-16 20:12:02.610478
1523	20	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 20:12:02.623735	2025-05-16 20:12:02.623739
1528	19	6	better-world-response	probably	\N	2025-05-16 20:12:02.639414	2025-05-16 20:12:02.63942
1533	19	8	gratitude-slider-1	8	\N	2025-05-16 20:12:02.654281	2025-05-16 20:12:02.654286
1538	19	8	cumulative-score	7	\N	2025-05-16 20:12:02.668173	2025-05-16 20:12:02.668177
1543	19	12	topic-sg-1	kind of	\N	2025-05-16 20:12:02.681437	2025-05-16 20:12:02.68144
1548	19	11	ableism-0	15	\N	2025-05-16 20:12:02.694711	2025-05-16 20:12:02.694715
1553	19	11	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:12:02.707901	2025-05-16 20:12:02.707905
1558	19	11	stakeholder-directly-0	directly	\N	2025-05-16 20:12:02.72103	2025-05-16 20:12:02.721034
1563	19	11	ableism-3	13	\N	2025-05-16 20:12:02.736264	2025-05-16 20:12:02.736269
1568	19	11	results-3	probably	\N	2025-05-16 20:12:02.749009	2025-05-16 20:12:02.749013
1573	19	11	stakeholder-directly-3	directly	\N	2025-05-16 20:12:02.762044	2025-05-16 20:12:02.762048
1578	19	11	ableism-6	3	\N	2025-05-16 20:12:02.775053	2025-05-16 20:12:02.775057
1583	19	11	racism-2	15	\N	2025-05-16 20:12:02.788308	2025-05-16 20:12:02.788312
1588	19	11	stakeholder-directly-6	directly	\N	2025-05-16 20:12:02.805139	2025-05-16 20:12:02.805142
1593	19	11	stakeholder-name-2	Cindy	\N	2025-05-16 20:12:02.818794	2025-05-16 20:12:02.818812
1598	19	11	racism-5	12	\N	2025-05-16 20:12:02.832205	2025-05-16 20:12:02.832209
1603	19	14	slider-value-2	9	\N	2025-05-16 20:12:02.844822	2025-05-16 20:12:02.844826
1608	19	14	slider-scale-2	Greed,Generosity	\N	2025-05-16 20:12:02.8586	2025-05-16 20:12:02.858606
1613	19	7	moral-duty-2	be bad	\N	2025-05-16 20:12:02.872764	2025-05-16 20:12:02.872769
1618	19	7	average-sacrifice	5	\N	2025-05-16 20:12:02.887655	2025-05-16 20:12:02.887661
1623	19	15	slider-interdependence	3	\N	2025-05-16 20:12:02.902956	2025-05-16 20:12:02.90296
1628	19	15	slider-environmental-stewardship-value	2	\N	2025-05-16 20:12:02.917288	2025-05-16 20:12:02.917293
1633	19	15	reflection-2-up	people are different	\N	2025-05-16 20:12:02.931891	2025-05-16 20:12:02.931896
1638	19	13	vice-2	5	\N	2025-05-16 20:12:02.945175	2025-05-16 20:12:02.945178
1643	19	13	domain-5	thing 5	\N	2025-05-16 20:12:02.959731	2025-05-16 20:12:02.959735
1648	19	13	vv-average	5	\N	2025-05-16 20:12:02.972333	2025-05-16 20:12:02.972337
1196	20	1	option-description-1	Do a little	\N	2025-05-16 20:12:01.643143	2025-05-16 20:12:01.643148
1206	20	1	harm-yes-3	false	\N	2025-05-16 20:12:01.671212	2025-05-16 20:12:01.671217
1216	20	1	stakeholder-name-5	Carol	\N	2025-05-16 20:12:01.698324	2025-05-16 20:12:01.698329
1226	20	1	publicity-no-1	false	\N	2025-05-16 20:12:01.726572	2025-05-16 20:12:01.726575
1236	20	1	tentative-choice-4	false	\N	2025-05-16 20:12:01.754148	2025-05-16 20:12:01.754152
1246	20	1	harm-yes-0	yes	\N	2025-05-16 20:12:01.782873	2025-05-16 20:12:01.782879
1256	20	1	harm-no-4	no	\N	2025-05-16 20:12:01.811037	2025-05-16 20:12:01.811041
1266	20	1	option-description-0	Do nothing	\N	2025-05-16 20:12:01.837583	2025-05-16 20:12:01.837587
1276	20	1	reversible-yes-2	false	\N	2025-05-16 20:12:01.87327	2025-05-16 20:12:01.873279
1284	19	10	stakeholder-name-0	Bob	\N	2025-05-16 20:12:01.913855	2025-05-16 20:12:01.913864
1289	19	10	responsiveness-0	7	\N	2025-05-16 20:12:01.938983	2025-05-16 20:12:01.938991
1294	19	10	competence-1	7	\N	2025-05-16 20:12:01.962499	2025-05-16 20:12:01.962509
1299	19	10	attentiveness-2	5	\N	2025-05-16 20:12:01.983618	2025-05-16 20:12:01.983624
1304	19	10	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:12:02.001215	2025-05-16 20:12:02.001222
1309	19	10	competence-4	2	\N	2025-05-16 20:12:02.025425	2025-05-16 20:12:02.025436
1314	19	10	stakeholder-name-4	Jeff	\N	2025-05-16 20:12:02.049259	2025-05-16 20:12:02.04927
1319	19	10	stakeholder-indirectly-3	false	\N	2025-05-16 20:12:02.071608	2025-05-16 20:12:02.071613
1324	19	10	cumulative-score	6	\N	2025-05-16 20:12:02.089209	2025-05-16 20:12:02.089216
1329	19	10	responsiveness-6	7	\N	2025-05-16 20:12:02.105442	2025-05-16 20:12:02.105447
1334	19	5	primary-virtue-never	be dishonest	\N	2025-05-16 20:12:02.11923	2025-05-16 20:12:02.119234
1339	20	5	universalizability-fail	fail	\N	2025-05-16 20:12:02.133042	2025-05-16 20:12:02.133046
1344	19	2	inverse-short-term-0	1	\N	2025-05-16 20:12:02.14567	2025-05-16 20:12:02.145674
1349	20	2	stakeholder-name-2	Cindy	\N	2025-05-16 20:12:02.157622	2025-05-16 20:12:02.157626
1354	19	2	stakeholder-directly-4	false	\N	2025-05-16 20:12:02.170578	2025-05-16 20:12:02.170582
1359	20	2	inverse-short-term-5	1	\N	2025-05-16 20:12:02.184406	2025-05-16 20:12:02.18441
1364	19	2	topic-2	yes	\N	2025-05-16 20:12:02.198894	2025-05-16 20:12:02.198899
1369	20	2	long-term-0	4	\N	2025-05-16 20:12:02.211473	2025-05-16 20:12:02.211477
1374	19	2	inverse-long-term-2	4	\N	2025-05-16 20:12:02.224957	2025-05-16 20:12:02.224962
1379	20	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:12:02.237748	2025-05-16 20:12:02.237751
1384	19	2	short-term-6	1	\N	2025-05-16 20:12:02.250197	2025-05-16 20:12:02.250201
1389	20	2	topic-3	unreliable	\N	2025-05-16 20:12:02.263873	2025-05-16 20:12:02.263877
1394	19	2	inverse-short-term-1	1	\N	2025-05-16 20:12:02.276673	2025-05-16 20:12:02.276676
1399	20	2	stakeholder-name-3	Samantha	\N	2025-05-16 20:12:02.289685	2025-05-16 20:12:02.289689
1404	19	2	stakeholder-directly-5	false	\N	2025-05-16 20:12:02.30199	2025-05-16 20:12:02.301994
1409	20	2	inverse-short-term-6	4	\N	2025-05-16 20:12:02.314422	2025-05-16 20:12:02.314426
1414	19	2	stakeholder-indirectly-0	false	\N	2025-05-16 20:12:02.327432	2025-05-16 20:12:02.327436
1419	20	2	long-term-1	4	\N	2025-05-16 20:12:02.343187	2025-05-16 20:12:02.343192
1424	19	2	inverse-long-term-3	1	\N	2025-05-16 20:12:02.356814	2025-05-16 20:12:02.356819
1429	20	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:12:02.370244	2025-05-16 20:12:02.370248
1434	19	2	ranked-long-term	35.71	\N	2025-05-16 20:12:02.382248	2025-05-16 20:12:02.382252
1439	20	2	short-term-0	4	\N	2025-05-16 20:12:02.394394	2025-05-16 20:12:02.394398
1444	19	2	inverse-short-term-2	4	\N	2025-05-16 20:12:02.406458	2025-05-16 20:12:02.406463
1449	20	2	stakeholder-name-4	Jeff	\N	2025-05-16 20:12:02.421944	2025-05-16 20:12:02.421949
1454	19	2	stakeholder-directly-6	directly	\N	2025-05-16 20:12:02.434812	2025-05-16 20:12:02.434816
1459	20	2	topic-1	bad	\N	2025-05-16 20:12:02.448061	2025-05-16 20:12:02.448066
1464	19	3	pain-1	8	\N	2025-05-16 20:12:02.460963	2025-05-16 20:12:02.460967
1469	20	3	pain-2	8	\N	2025-05-16 20:12:02.474094	2025-05-16 20:12:02.474098
1474	19	3	pleasure-3	2	\N	2025-05-16 20:12:02.487907	2025-05-16 20:12:02.487911
1479	20	3	pain-5	8	\N	2025-05-16 20:12:02.500108	2025-05-16 20:12:02.500112
1484	19	3	total-pleasure	175	\N	2025-05-16 20:12:02.513152	2025-05-16 20:12:02.513156
1489	20	3	pleasure-pain-ratio	73	\N	2025-05-16 20:12:02.52899	2025-05-16 20:12:02.528993
1494	19	4	mill-pleasure-0	1	\N	2025-05-16 20:12:02.543915	2025-05-16 20:12:02.543919
1499	20	4	mill-pleasure-1	2	\N	2025-05-16 20:12:02.556287	2025-05-16 20:12:02.556291
1504	19	4	mill-pain-3	7	\N	2025-05-16 20:12:02.570061	2025-05-16 20:12:02.570066
1509	20	4	mill-pleasure-4	2	\N	2025-05-16 20:12:02.585718	2025-05-16 20:12:02.585722
1514	19	4	mill-pleasure-6	6	\N	2025-05-16 20:12:02.599638	2025-05-16 20:12:02.599642
1519	20	4	mill-total-pleasure	84	\N	2025-05-16 20:12:02.612987	2025-05-16 20:12:02.612992
1524	19	4	cumulative-score	0	\N	2025-05-16 20:12:02.627	2025-05-16 20:12:02.627007
1529	19	8	fidelity-slider-1	7	\N	2025-05-16 20:12:02.642479	2025-05-16 20:12:02.642485
1534	19	8	gratitude-slider-2	7	\N	2025-05-16 20:12:02.657169	2025-05-16 20:12:02.657175
1539	19	12	slider-0	2	\N	2025-05-16 20:12:02.671104	2025-05-16 20:12:02.671108
1544	19	12	topic-sg-2	no and no	\N	2025-05-16 20:12:02.684142	2025-05-16 20:12:02.684146
1549	19	11	sexism-1	5	\N	2025-05-16 20:12:02.697302	2025-05-16 20:12:02.697305
1554	19	11	stakeholder-name-5	Carol	\N	2025-05-16 20:12:02.71042	2025-05-16 20:12:02.710423
1559	19	11	ageism-0	15	\N	2025-05-16 20:12:02.725007	2025-05-16 20:12:02.725012
1564	19	11	sexism-4	5	\N	2025-05-16 20:12:02.73884	2025-05-16 20:12:02.738844
1569	19	11	stakeholder-indirectly-0	false	\N	2025-05-16 20:12:02.751537	2025-05-16 20:12:02.751541
1574	19	11	ageism-3	5	\N	2025-05-16 20:12:02.764406	2025-05-16 20:12:02.76441
1579	19	11	cumulative-score	5	\N	2025-05-16 20:12:02.777827	2025-05-16 20:12:02.777831
1584	19	11	stakeholder-indirectly-3	false	\N	2025-05-16 20:12:02.792115	2025-05-16 20:12:02.792123
1589	19	11	ageism-6	15	\N	2025-05-16 20:12:02.807933	2025-05-16 20:12:02.807937
1594	19	11	ableism-2	4	\N	2025-05-16 20:12:02.821487	2025-05-16 20:12:02.821491
1599	19	11	stakeholder-indirectly-6	false	\N	2025-05-16 20:12:02.834691	2025-05-16 20:12:02.834695
1604	19	14	response-1-lp	wrong	\N	2025-05-16 20:12:02.84751	2025-05-16 20:12:02.847514
1609	19	14	num-sliders-lp	3	\N	2025-05-16 20:12:02.861626	2025-05-16 20:12:02.861632
1614	19	7	slider-2	10	\N	2025-05-16 20:12:02.875634	2025-05-16 20:12:02.875639
1619	19	7	cumulative-score	5	\N	2025-05-16 20:12:02.890671	2025-05-16 20:12:02.890677
1624	19	15	slider-society-responsibility-value	7	\N	2025-05-16 20:12:02.90595	2025-05-16 20:12:02.905955
1629	19	15	slider-environmental-stewardship	8	\N	2025-05-16 20:12:02.919956	2025-05-16 20:12:02.91996
1634	19	15	cumulative-score	-3	\N	2025-05-16 20:12:02.934853	2025-05-16 20:12:02.934856
1639	19	13	domain-3	thing 3	\N	2025-05-16 20:12:02.947615	2025-05-16 20:12:02.947618
1644	19	13	vice-5	17	\N	2025-05-16 20:12:02.96259	2025-05-16 20:12:02.962593
1649	19	13	cumulative-score	5	\N	2025-05-16 20:12:02.974731	2025-05-16 20:12:02.974734
1202	20	1	publicity-yes-1	yes	\N	2025-05-16 20:12:01.660342	2025-05-16 20:12:01.660346
1212	20	1	tentative-choice-3	Get help	\N	2025-05-16 20:12:01.687729	2025-05-16 20:12:01.687735
1222	20	1	option-description-4	pay for some help	\N	2025-05-16 20:12:01.715046	2025-05-16 20:12:01.715052
1232	20	1	harm-yes-4	false	\N	2025-05-16 20:12:01.743106	2025-05-16 20:12:01.74311
1242	20	1	option-title-0	Do nothing	\N	2025-05-16 20:12:01.77067	2025-05-16 20:12:01.770676
1252	20	1	publicity-no-2	false	\N	2025-05-16 20:12:01.800033	2025-05-16 20:12:01.80004
1262	20	1	stakeholder-name-4	Jeff	\N	2025-05-16 20:12:01.82701	2025-05-16 20:12:01.827014
1272	20	1	harm-yes-1	yes	\N	2025-05-16 20:12:01.855049	2025-05-16 20:12:01.855054
1282	20	1	tentative-choice-1	false	\N	2025-05-16 20:12:01.894093	2025-05-16 20:12:01.8941
1285	19	10	stakeholder-directly-0	directly	\N	2025-05-16 20:12:01.917317	2025-05-16 20:12:01.917323
1290	19	10	stakeholder-name-1	Jim	\N	2025-05-16 20:12:01.942148	2025-05-16 20:12:01.942154
1295	19	10	responsiveness-1	2	\N	2025-05-16 20:12:01.966777	2025-05-16 20:12:01.966787
1300	19	10	competence-2	8	\N	2025-05-16 20:12:01.98667	2025-05-16 20:12:01.986676
1305	19	10	stakeholder-directly-6	directly	\N	2025-05-16 20:12:02.004461	2025-05-16 20:12:02.004467
1310	19	10	attentiveness-5	9	\N	2025-05-16 20:12:02.031001	2025-05-16 20:12:02.03101
1315	19	10	responsiveness-4	0	\N	2025-05-16 20:12:02.056696	2025-05-16 20:12:02.056703
1320	19	10	stakeholder-directly-4	false	\N	2025-05-16 20:12:02.074294	2025-05-16 20:12:02.074299
1325	19	10	attentiveness-3	6	\N	2025-05-16 20:12:02.093373	2025-05-16 20:12:02.093379
1330	19	5	moral-virtues	Honesty	\N	2025-05-16 20:12:02.108226	2025-05-16 20:12:02.108231
1335	20	5	primary-virtue-never	be dishonest	\N	2025-05-16 20:12:02.122177	2025-05-16 20:12:02.122182
1340	19	5	consistency-pass	pass	\N	2025-05-16 20:12:02.135471	2025-05-16 20:12:02.135475
1345	20	2	inverse-short-term-0	1	\N	2025-05-16 20:12:02.148105	2025-05-16 20:12:02.148109
1350	19	2	long-term-2	1	\N	2025-05-16 20:12:02.16013	2025-05-16 20:12:02.160133
1355	20	2	stakeholder-directly-4	false	\N	2025-05-16 20:12:02.173121	2025-05-16 20:12:02.173125
1360	19	2	stakeholder-indirectly-6	false	\N	2025-05-16 20:12:02.187602	2025-05-16 20:12:02.187608
1365	20	2	topic-2	yes	\N	2025-05-16 20:12:02.201399	2025-05-16 20:12:02.201403
1370	19	2	short-term-1	4	\N	2025-05-16 20:12:02.213957	2025-05-16 20:12:02.213961
1375	20	2	inverse-long-term-2	4	\N	2025-05-16 20:12:02.227474	2025-05-16 20:12:02.227478
1380	19	2	stakeholder-name-5	Carol	\N	2025-05-16 20:12:02.240245	2025-05-16 20:12:02.240248
1385	20	2	short-term-6	1	\N	2025-05-16 20:12:02.252684	2025-05-16 20:12:02.252688
1390	19	2	stakeholder-directly-0	directly	\N	2025-05-16 20:12:02.266394	2025-05-16 20:12:02.266398
1395	20	2	inverse-short-term-1	1	\N	2025-05-16 20:12:02.279305	2025-05-16 20:12:02.279308
1400	19	2	long-term-3	4	\N	2025-05-16 20:12:02.292201	2025-05-16 20:12:02.292205
1405	20	2	stakeholder-directly-5	false	\N	2025-05-16 20:12:02.304352	2025-05-16 20:12:02.304355
1410	19	2	ranked-short-term	39.29	\N	2025-05-16 20:12:02.316926	2025-05-16 20:12:02.31693
1415	20	2	stakeholder-indirectly-0	false	\N	2025-05-16 20:12:02.329892	2025-05-16 20:12:02.329895
1420	19	2	short-term-2	1	\N	2025-05-16 20:12:02.345874	2025-05-16 20:12:02.345879
1425	20	2	inverse-long-term-3	1	\N	2025-05-16 20:12:02.359776	2025-05-16 20:12:02.359781
1430	19	2	stakeholder-name-6	Charles	\N	2025-05-16 20:12:02.372719	2025-05-16 20:12:02.372723
1435	20	2	ranked-long-term	35.71	\N	2025-05-16 20:12:02.384674	2025-05-16 20:12:02.384677
1440	19	2	stakeholder-directly-1	directly	\N	2025-05-16 20:12:02.3967	2025-05-16 20:12:02.396704
1445	20	2	inverse-short-term-2	4	\N	2025-05-16 20:12:02.409632	2025-05-16 20:12:02.409638
1450	19	2	long-term-4	1	\N	2025-05-16 20:12:02.424647	2025-05-16 20:12:02.424651
1455	20	2	stakeholder-directly-6	directly	\N	2025-05-16 20:12:02.43721	2025-05-16 20:12:02.437214
1460	19	3	pain-0	7	\N	2025-05-16 20:12:02.450694	2025-05-16 20:12:02.450698
1465	20	3	pain-1	8	\N	2025-05-16 20:12:02.463406	2025-05-16 20:12:02.463409
1470	19	3	pleasure-2	1	\N	2025-05-16 20:12:02.476971	2025-05-16 20:12:02.476975
1475	20	3	pleasure-3	2	\N	2025-05-16 20:12:02.490512	2025-05-16 20:12:02.490516
1480	19	3	pain-6	2	\N	2025-05-16 20:12:02.502614	2025-05-16 20:12:02.502618
1485	20	3	total-pleasure	175	\N	2025-05-16 20:12:02.515934	2025-05-16 20:12:02.515938
1490	19	3	cumulative-score	10	\N	2025-05-16 20:12:02.531504	2025-05-16 20:12:02.531508
1495	20	4	mill-pleasure-0	1	\N	2025-05-16 20:12:02.546477	2025-05-16 20:12:02.546481
1500	19	4	mill-pain-2	7	\N	2025-05-16 20:12:02.558825	2025-05-16 20:12:02.558828
1505	20	4	mill-pain-3	7	\N	2025-05-16 20:12:02.573329	2025-05-16 20:12:02.573335
1510	19	4	mill-pain-5	2	\N	2025-05-16 20:12:02.58849	2025-05-16 20:12:02.588494
1515	20	4	mill-pleasure-6	6	\N	2025-05-16 20:12:02.602438	2025-05-16 20:12:02.602442
1520	19	4	mill-total-pain	176	\N	2025-05-16 20:12:02.6154	2025-05-16 20:12:02.615405
1525	20	4	cumulative-score	0	\N	2025-05-16 20:12:02.630105	2025-05-16 20:12:02.630114
1530	19	8	fidelity-slider-2	2	\N	2025-05-16 20:12:02.645194	2025-05-16 20:12:02.645199
1535	19	8	topic-1-dva	Not really	\N	2025-05-16 20:12:02.659881	2025-05-16 20:12:02.659886
1540	19	12	slider-1	2	\N	2025-05-16 20:12:02.673785	2025-05-16 20:12:02.673789
1545	19	12	num-sliders	3	\N	2025-05-16 20:12:02.68676	2025-05-16 20:12:02.686763
1550	19	11	stakeholder-directly-2	false	\N	2025-05-16 20:12:02.699979	2025-05-16 20:12:02.699984
1555	19	11	ableism-5	5	\N	2025-05-16 20:12:02.713085	2025-05-16 20:12:02.713088
1560	19	11	racism-1	5	\N	2025-05-16 20:12:02.727844	2025-05-16 20:12:02.727849
1565	19	11	stakeholder-directly-5	false	\N	2025-05-16 20:12:02.741386	2025-05-16 20:12:02.74139
1570	19	11	stakeholder-name-1	Jim	\N	2025-05-16 20:12:02.754147	2025-05-16 20:12:02.754153
1575	19	11	racism-4	7	\N	2025-05-16 20:12:02.767012	2025-05-16 20:12:02.767016
1580	19	11	sexism-0	15	\N	2025-05-16 20:12:02.780577	2025-05-16 20:12:02.780581
1585	19	11	stakeholder-name-4	Jeff	\N	2025-05-16 20:12:02.796186	2025-05-16 20:12:02.796193
1590	19	11	stakeholder-name-0	Bob	\N	2025-05-16 20:12:02.810704	2025-05-16 20:12:02.810707
1595	19	11	sexism-3	13	\N	2025-05-16 20:12:02.824222	2025-05-16 20:12:02.824227
1600	19	11	results-1	its good	\N	2025-05-16 20:12:02.837151	2025-05-16 20:12:02.837154
1605	19	14	response-2-lp	sometimes	\N	2025-05-16 20:12:02.850018	2025-05-16 20:12:02.850022
1610	19	14	cumulative-score	NaN	\N	2025-05-16 20:12:02.864403	2025-05-16 20:12:02.864409
1615	19	7	moral-duty-3	be neutral	\N	2025-05-16 20:12:02.878451	2025-05-16 20:12:02.878456
1620	19	15	slider-reverence-for-life-value	7	\N	2025-05-16 20:12:02.893783	2025-05-16 20:12:02.893789
1625	19	15	slider-society-responsibility	3	\N	2025-05-16 20:12:02.908762	2025-05-16 20:12:02.908767
1630	19	15	slider-reverence-for-place-value	2	\N	2025-05-16 20:12:02.923166	2025-05-16 20:12:02.923172
1635	19	13	domain-1	thing 1	\N	2025-05-16 20:12:02.937424	2025-05-16 20:12:02.937428
1640	19	13	vice-3	10	\N	2025-05-16 20:12:02.950025	2025-05-16 20:12:02.950028
1645	19	13	question-ve	yes	\N	2025-05-16 20:12:02.965043	2025-05-16 20:12:02.965047
1198	20	1	option-title-4	Pay for help	\N	2025-05-16 20:12:01.648853	2025-05-16 20:12:01.648858
1208	20	1	reversible-no-3	no	\N	2025-05-16 20:12:01.676631	2025-05-16 20:12:01.676635
1218	20	1	stakeholder-indirectly-6	false	\N	2025-05-16 20:12:01.703657	2025-05-16 20:12:01.703661
1228	20	1	publicity-yes-2	yes	\N	2025-05-16 20:12:01.731793	2025-05-16 20:12:01.731813
1238	20	1	stakeholder-indirectly-3	false	\N	2025-05-16 20:12:01.759269	2025-05-16 20:12:01.759272
1248	20	1	reversible-no-0	false	\N	2025-05-16 20:12:01.788955	2025-05-16 20:12:01.788961
1258	20	1	tentative-choice-0	false	\N	2025-05-16 20:12:01.816323	2025-05-16 20:12:01.816328
1268	20	1	option-title-3	Get help	\N	2025-05-16 20:12:01.84345	2025-05-16 20:12:01.843454
1278	20	1	publicity-no-3	no	\N	2025-05-16 20:12:01.880228	2025-05-16 20:12:01.880236
1286	19	10	stakeholder-indirectly-0	false	\N	2025-05-16 20:12:01.923328	2025-05-16 20:12:01.923335
1291	19	10	stakeholder-directly-1	directly	\N	2025-05-16 20:12:01.945264	2025-05-16 20:12:01.94527
1296	19	10	stakeholder-name-2	Cindy	\N	2025-05-16 20:12:01.973324	2025-05-16 20:12:01.973332
1301	19	10	responsiveness-2	9	\N	2025-05-16 20:12:01.989788	2025-05-16 20:12:01.989793
1306	19	10	results-1-ce	responsivness, because it was less responsive	\N	2025-05-16 20:12:02.00751	2025-05-16 20:12:02.007516
1311	19	10	stakeholder-indirectly-6	false	\N	2025-05-16 20:12:02.03419	2025-05-16 20:12:02.034197
1316	19	10	competence-5	3	\N	2025-05-16 20:12:02.060015	2025-05-16 20:12:02.060021
1321	19	10	stakeholder-name-5	Carol	\N	2025-05-16 20:12:02.077415	2025-05-16 20:12:02.077421
1326	19	10	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:12:02.096776	2025-05-16 20:12:02.096783
1331	20	5	moral-virtues	Honesty	\N	2025-05-16 20:12:02.111176	2025-05-16 20:12:02.111182
1336	19	5	universalizability-pass	false	\N	2025-05-16 20:12:02.124926	2025-05-16 20:12:02.124933
1341	20	5	consistency-pass	pass	\N	2025-05-16 20:12:02.138101	2025-05-16 20:12:02.138105
1346	19	2	stakeholder-indirectly-1	false	\N	2025-05-16 20:12:02.150491	2025-05-16 20:12:02.150494
1351	20	2	long-term-2	1	\N	2025-05-16 20:12:02.162563	2025-05-16 20:12:02.162567
1356	19	2	inverse-long-term-4	4	\N	2025-05-16 20:12:02.176441	2025-05-16 20:12:02.176446
1361	20	2	stakeholder-indirectly-6	false	\N	2025-05-16 20:12:02.190478	2025-05-16 20:12:02.190484
1366	19	2	stakeholder-name-0	Bob	\N	2025-05-16 20:12:02.203894	2025-05-16 20:12:02.203898
1371	20	2	short-term-1	4	\N	2025-05-16 20:12:02.216488	2025-05-16 20:12:02.216493
1376	19	2	inverse-short-term-3	4	\N	2025-05-16 20:12:02.230013	2025-05-16 20:12:02.230017
1381	20	2	stakeholder-name-5	Carol	\N	2025-05-16 20:12:02.242708	2025-05-16 20:12:02.242711
1386	19	2	unranked-long-term	34.29	\N	2025-05-16 20:12:02.255288	2025-05-16 20:12:02.255293
1391	20	2	stakeholder-directly-0	directly	\N	2025-05-16 20:12:02.268923	2025-05-16 20:12:02.268928
1396	19	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:12:02.281894	2025-05-16 20:12:02.281897
1401	20	2	long-term-3	4	\N	2025-05-16 20:12:02.2947	2025-05-16 20:12:02.294703
1406	19	2	inverse-long-term-5	0	\N	2025-05-16 20:12:02.30674	2025-05-16 20:12:02.306744
1411	20	2	ranked-short-term	39.29	\N	2025-05-16 20:12:02.319615	2025-05-16 20:12:02.319618
1416	19	2	stakeholder-name-1	Jim	\N	2025-05-16 20:12:02.332955	2025-05-16 20:12:02.332959
1421	20	2	short-term-2	1	\N	2025-05-16 20:12:02.34862	2025-05-16 20:12:02.348625
1426	19	2	inverse-short-term-4	0	\N	2025-05-16 20:12:02.362587	2025-05-16 20:12:02.362593
1431	20	2	stakeholder-name-6	Charles	\N	2025-05-16 20:12:02.375132	2025-05-16 20:12:02.375136
1436	19	2	num_stakeholders	7	\N	2025-05-16 20:12:02.387383	2025-05-16 20:12:02.387386
1441	20	2	stakeholder-directly-1	directly	\N	2025-05-16 20:12:02.3991	2025-05-16 20:12:02.399103
1446	19	2	stakeholder-indirectly-3	false	\N	2025-05-16 20:12:02.412511	2025-05-16 20:12:02.412516
1451	20	2	long-term-4	1	\N	2025-05-16 20:12:02.427322	2025-05-16 20:12:02.427326
1456	19	2	inverse-long-term-6	1	\N	2025-05-16 20:12:02.440141	2025-05-16 20:12:02.440146
1461	20	3	pain-0	7	\N	2025-05-16 20:12:02.45347	2025-05-16 20:12:02.453474
1466	19	3	pleasure-1	7	\N	2025-05-16 20:12:02.465906	2025-05-16 20:12:02.46591
1471	20	3	pleasure-2	1	\N	2025-05-16 20:12:02.479869	2025-05-16 20:12:02.479873
1476	19	3	pleasure-4	8	\N	2025-05-16 20:12:02.49297	2025-05-16 20:12:02.492974
1481	20	3	pain-6	2	\N	2025-05-16 20:12:02.505256	2025-05-16 20:12:02.50526
1486	19	3	total-pain	66	\N	2025-05-16 20:12:02.519085	2025-05-16 20:12:02.51909
1491	20	3	cumulative-score	10	\N	2025-05-16 20:12:02.5353	2025-05-16 20:12:02.535305
1496	19	4	mill-pain-1	3	\N	2025-05-16 20:12:02.548936	2025-05-16 20:12:02.54894
1501	20	4	mill-pain-2	7	\N	2025-05-16 20:12:02.561196	2025-05-16 20:12:02.5612
1506	19	4	mill-pleasure-3	7	\N	2025-05-16 20:12:02.576329	2025-05-16 20:12:02.576336
1511	20	4	mill-pain-5	2	\N	2025-05-16 20:12:02.591188	2025-05-16 20:12:02.591193
1516	19	4	reflection	yes	\N	2025-05-16 20:12:02.605143	2025-05-16 20:12:02.605148
1521	20	4	mill-total-pain	176	\N	2025-05-16 20:12:02.618118	2025-05-16 20:12:02.618123
1526	19	6	universal-response	not very consistent	\N	2025-05-16 20:12:02.633431	2025-05-16 20:12:02.633437
1531	19	8	reparation-slider-1	2	\N	2025-05-16 20:12:02.647812	2025-05-16 20:12:02.647818
1536	19	8	topic-2-dva	more important	\N	2025-05-16 20:12:02.662629	2025-05-16 20:12:02.662635
1541	19	12	slider-2	2	\N	2025-05-16 20:12:02.676307	2025-05-16 20:12:02.676311
1546	19	12	cumulative-score	2	\N	2025-05-16 20:12:02.689384	2025-05-16 20:12:02.689388
1551	19	11	ageism-2	12	\N	2025-05-16 20:12:02.702523	2025-05-16 20:12:02.70254
1556	19	11	sexism-6	5	\N	2025-05-16 20:12:02.715776	2025-05-16 20:12:02.71578
1561	19	11	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:12:02.73081	2025-05-16 20:12:02.730815
1566	19	11	ageism-5	2	\N	2025-05-16 20:12:02.743883	2025-05-16 20:12:02.743887
1571	19	11	ableism-1	5	\N	2025-05-16 20:12:02.756739	2025-05-16 20:12:02.756744
1576	19	11	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:12:02.769604	2025-05-16 20:12:02.769607
1581	19	11	stakeholder-directly-1	directly	\N	2025-05-16 20:12:02.783095	2025-05-16 20:12:02.783099
1586	19	11	ableism-4	12	\N	2025-05-16 20:12:02.799214	2025-05-16 20:12:02.799219
1591	19	11	racism-0	15	\N	2025-05-16 20:12:02.81333	2025-05-16 20:12:02.813334
1596	19	11	stakeholder-directly-4	false	\N	2025-05-16 20:12:02.826892	2025-05-16 20:12:02.826896
1601	19	14	slider-value-0	7	\N	2025-05-16 20:12:02.839691	2025-05-16 20:12:02.839695
1606	19	14	slider-scale-0	Ignorance,Wisdom	\N	2025-05-16 20:12:02.852509	2025-05-16 20:12:02.852513
1611	19	7	moral-duty-1	be good	\N	2025-05-16 20:12:02.867317	2025-05-16 20:12:02.867322
1616	19	7	slider-3	5	\N	2025-05-16 20:12:02.881203	2025-05-16 20:12:02.881207
1621	19	15	slider-reverence-for-life	3	\N	2025-05-16 20:12:02.897115	2025-05-16 20:12:02.897121
1626	19	15	slider-global-justice-value	10	\N	2025-05-16 20:12:02.911425	2025-05-16 20:12:02.911431
1631	19	15	slider-reverence-for-place	8	\N	2025-05-16 20:12:02.926258	2025-05-16 20:12:02.926263
1636	19	13	vice-1	17	\N	2025-05-16 20:12:02.939971	2025-05-16 20:12:02.939975
1641	19	13	domain-4	thing 4	\N	2025-05-16 20:12:02.954275	2025-05-16 20:12:02.954281
1646	19	13	reflection-ve	yes	\N	2025-05-16 20:12:02.967497	2025-05-16 20:12:02.9675
1650	19	1	dilemma-2	false	\N	2025-05-16 20:12:31.321955	2025-05-16 20:12:31.292663
1651	19	1	dilemma-1	false	\N	2025-05-16 20:12:31.323775	2025-05-16 20:12:31.292663
1653	19	1	stakeholder-directly-0	directly	\N	2025-05-16 20:12:31.327808	2025-05-16 20:12:31.292663
1654	19	1	stakeholder-indirectly-0	false	\N	2025-05-16 20:12:31.329245	2025-05-16 20:12:31.292663
1655	19	1	stakeholder-directly-1	directly	\N	2025-05-16 20:12:31.330674	2025-05-16 20:12:31.292663
1656	19	1	stakeholder-indirectly-1	false	\N	2025-05-16 20:12:31.331974	2025-05-16 20:12:31.292663
1658	19	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:12:31.334734	2025-05-16 20:12:31.292663
2391	1	7	slider-2	1	\N	2025-05-19 22:05:57.860474	2025-05-19 22:05:57.850635
2396	1	7	num-sacrifices	3	\N	2025-05-19 22:05:57.867154	2025-05-19 22:05:57.850635
2400	1	8	fidelity-slider-2	5	\N	2025-05-19 22:09:06.111758	2025-05-19 22:09:06.10623
2405	1	8	topic-dva-0	I think so, promises are hard because there is a conflict. I make a promise to people who fly in our planes-I will put your safety first; but I also make a promise to my company-I won't reveal secrets.	\N	2025-05-19 22:09:06.120309	2025-05-19 22:09:06.10623
1657	19	1	stakeholder-directly-2	false	\N	2025-05-16 20:12:31.33321	2025-05-16 20:12:31.292663
1662	19	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:12:31.340179	2025-05-16 20:12:31.292663
1667	19	1	tentative-choice-0	false	\N	2025-05-16 20:12:31.349296	2025-05-16 20:12:31.292663
1659	19	1	stakeholder-directly-3	directly	\N	2025-05-16 20:12:31.336064	2025-05-16 20:12:31.292663
1664	19	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:12:31.344378	2025-05-16 20:12:31.292663
1669	19	1	tentative-choice-2	false	\N	2025-05-16 20:12:31.352221	2025-05-16 20:12:31.292663
1660	19	1	stakeholder-indirectly-3	false	\N	2025-05-16 20:12:31.337349	2025-05-16 20:12:31.292663
1665	19	1	stakeholder-directly-6	directly	\N	2025-05-16 20:12:31.346496	2025-05-16 20:12:31.292663
1670	19	1	num_stakeholders	7	\N	2025-05-16 20:12:31.353653	2025-05-16 20:12:31.292663
1661	19	1	stakeholder-directly-4	false	\N	2025-05-16 20:12:31.33858	2025-05-16 20:12:31.292663
1666	19	1	stakeholder-indirectly-6	false	\N	2025-05-16 20:12:31.347976	2025-05-16 20:12:31.292663
1663	19	1	stakeholder-directly-5	false	\N	2025-05-16 20:12:31.341998	2025-05-16 20:12:31.292663
1668	19	1	tentative-choice-1	false	\N	2025-05-16 20:12:31.350629	2025-05-16 20:12:31.292663
1671	25	1	dilemma-0	Doing Wrong to do Right	\N	2025-05-16 20:15:06.665334	2025-05-16 20:15:06.665341
1673	25	1	dilemma-1	false	\N	2025-05-16 20:15:06.679303	2025-05-16 20:15:06.679311
1675	25	1	dilemma-2	false	\N	2025-05-16 20:15:06.688218	2025-05-16 20:15:06.688225
1677	25	1	state-the-problem	The problem exists	\N	2025-05-16 20:15:06.6944	2025-05-16 20:15:06.694407
1679	25	1	gather-facts-1	because reasons	\N	2025-05-16 20:15:06.7005	2025-05-16 20:15:06.700509
1681	25	1	gather-facts-2	earth	\N	2025-05-16 20:15:06.708305	2025-05-16 20:15:06.708312
1683	25	1	gather-facts-3	yesterday	\N	2025-05-16 20:15:06.715001	2025-05-16 20:15:06.715008
1685	25	1	stakeholder-name-0	Bob	\N	2025-05-16 20:15:06.720993	2025-05-16 20:15:06.721002
1687	25	1	stakeholder-directly-0	directly	\N	2025-05-16 20:15:06.727186	2025-05-16 20:15:06.727196
1689	25	1	stakeholder-indirectly-0	false	\N	2025-05-16 20:15:06.733838	2025-05-16 20:15:06.733843
1691	25	1	stakeholder-name-1	Jim	\N	2025-05-16 20:15:06.741096	2025-05-16 20:15:06.741104
1693	25	1	stakeholder-directly-1	directly	\N	2025-05-16 20:15:06.747672	2025-05-16 20:15:06.747679
1695	25	1	stakeholder-indirectly-1	false	\N	2025-05-16 20:15:06.753332	2025-05-16 20:15:06.753337
1697	25	1	stakeholder-name-2	Cindy	\N	2025-05-16 20:15:06.759664	2025-05-16 20:15:06.759672
1699	25	1	stakeholder-directly-2	false	\N	2025-05-16 20:15:06.765433	2025-05-16 20:15:06.765438
1701	25	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:15:06.771139	2025-05-16 20:15:06.771144
1703	25	1	stakeholder-directly-4	false	\N	2025-05-16 20:15:06.776733	2025-05-16 20:15:06.776738
1705	25	1	stakeholder-name-6	Charles	\N	2025-05-16 20:15:06.782338	2025-05-16 20:15:06.782342
1707	25	1	option-title-1	Do a little	\N	2025-05-16 20:15:06.787882	2025-05-16 20:15:06.787886
1709	25	1	option-description-3	get some help	\N	2025-05-16 20:15:06.794028	2025-05-16 20:15:06.794034
1711	25	1	publicity-yes-0	yes	\N	2025-05-16 20:15:06.799974	2025-05-16 20:15:06.79998
1713	25	1	harm-no-1	false	\N	2025-05-16 20:15:06.805983	2025-05-16 20:15:06.805989
1715	25	1	harm-yes-2	yes	\N	2025-05-16 20:15:06.811958	2025-05-16 20:15:06.811964
1717	25	1	reversible-no-2	no	\N	2025-05-16 20:15:06.817872	2025-05-16 20:15:06.817877
1719	25	1	reversible-yes-3	false	\N	2025-05-16 20:15:06.82318	2025-05-16 20:15:06.823184
1721	25	1	publicity-no-4	false	\N	2025-05-16 20:15:06.831433	2025-05-16 20:15:06.831438
1723	25	1	tentative-choice-2	false	\N	2025-05-16 20:15:06.836932	2025-05-16 20:15:06.836937
1725	25	1	stakeholder-name-3	Samantha	\N	2025-05-16 20:15:06.842023	2025-05-16 20:15:06.842027
1727	25	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:15:06.847074	2025-05-16 20:15:06.847078
1729	25	1	stakeholder-directly-6	directly	\N	2025-05-16 20:15:06.852862	2025-05-16 20:15:06.852867
1731	25	1	option-description-1	Do a little	\N	2025-05-16 20:15:06.859319	2025-05-16 20:15:06.859325
1733	25	1	option-title-4	Pay for help	\N	2025-05-16 20:15:06.865513	2025-05-16 20:15:06.865518
1735	25	1	publicity-no-0	false	\N	2025-05-16 20:15:06.871765	2025-05-16 20:15:06.87177
1737	25	1	publicity-yes-1	yes	\N	2025-05-16 20:15:06.877993	2025-05-16 20:15:06.877998
1739	25	1	harm-no-2	false	\N	2025-05-16 20:15:06.883538	2025-05-16 20:15:06.883542
1741	25	1	harm-yes-3	false	\N	2025-05-16 20:15:06.889438	2025-05-16 20:15:06.889443
1743	25	1	reversible-no-3	no	\N	2025-05-16 20:15:06.894972	2025-05-16 20:15:06.894977
1745	25	1	reversible-yes-4	yes	\N	2025-05-16 20:15:06.900431	2025-05-16 20:15:06.900436
1747	25	1	tentative-choice-3	Get help	\N	2025-05-16 20:15:06.905888	2025-05-16 20:15:06.905893
1749	25	1	stakeholder-directly-3	directly	\N	2025-05-16 20:15:06.911233	2025-05-16 20:15:06.911238
1751	25	1	stakeholder-name-5	Carol	\N	2025-05-16 20:15:06.916497	2025-05-16 20:15:06.916502
1753	25	1	stakeholder-indirectly-6	false	\N	2025-05-16 20:15:06.922272	2025-05-16 20:15:06.922277
1755	25	1	option-title-2	Do lots 	\N	2025-05-16 20:15:06.928003	2025-05-16 20:15:06.928008
1757	25	1	option-description-4	pay for some help	\N	2025-05-16 20:15:06.933475	2025-05-16 20:15:06.933479
1759	25	1	reversible-yes-0	yes	\N	2025-05-16 20:15:06.938899	2025-05-16 20:15:06.938903
1761	25	1	publicity-no-1	false	\N	2025-05-16 20:15:06.944847	2025-05-16 20:15:06.944853
1763	25	1	publicity-yes-2	yes	\N	2025-05-16 20:15:06.950509	2025-05-16 20:15:06.950515
1765	25	1	harm-no-3	no	\N	2025-05-16 20:15:06.956213	2025-05-16 20:15:06.956218
1767	25	1	harm-yes-4	false	\N	2025-05-16 20:15:06.961685	2025-05-16 20:15:06.96169
1769	25	1	reversible-no-4	false	\N	2025-05-16 20:15:06.967031	2025-05-16 20:15:06.967036
1771	25	1	tentative-choice-4	false	\N	2025-05-16 20:15:06.972249	2025-05-16 20:15:06.972253
1773	25	1	stakeholder-indirectly-3	false	\N	2025-05-16 20:15:06.977571	2025-05-16 20:15:06.977575
1775	25	1	stakeholder-directly-5	false	\N	2025-05-16 20:15:06.983281	2025-05-16 20:15:06.983286
1777	25	1	option-title-0	Do nothing	\N	2025-05-16 20:15:06.98876	2025-05-16 20:15:06.988766
1779	25	1	option-description-2	Do lots	\N	2025-05-16 20:15:06.994621	2025-05-16 20:15:06.994626
1781	25	1	harm-yes-0	yes	\N	2025-05-16 20:15:06.999853	2025-05-16 20:15:06.999857
1783	25	1	reversible-no-0	false	\N	2025-05-16 20:15:07.005826	2025-05-16 20:15:07.005833
1785	25	1	reversible-yes-1	yes	\N	2025-05-16 20:15:07.011389	2025-05-16 20:15:07.011394
1787	25	1	publicity-no-2	false	\N	2025-05-16 20:15:07.016609	2025-05-16 20:15:07.016613
1789	25	1	publicity-yes-3	false	\N	2025-05-16 20:15:07.02287	2025-05-16 20:15:07.022875
1791	25	1	harm-no-4	no	\N	2025-05-16 20:15:07.028201	2025-05-16 20:15:07.028205
1793	25	1	tentative-choice-0	false	\N	2025-05-16 20:15:07.033709	2025-05-16 20:15:07.033713
1795	25	1	num_stakeholders	7	\N	2025-05-16 20:15:07.038915	2025-05-16 20:15:07.038919
1797	25	1	stakeholder-name-4	Jeff	\N	2025-05-16 20:15:07.0439	2025-05-16 20:15:07.043905
1799	25	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:15:07.049193	2025-05-16 20:15:07.049197
1801	25	1	option-description-0	Do nothing	\N	2025-05-16 20:15:07.055137	2025-05-16 20:15:07.055142
1803	25	1	option-title-3	Get help	\N	2025-05-16 20:15:07.062066	2025-05-16 20:15:07.062072
1805	25	1	harm-no-0	false	\N	2025-05-16 20:15:07.067457	2025-05-16 20:15:07.067463
1807	25	1	harm-yes-1	yes	\N	2025-05-16 20:15:07.072552	2025-05-16 20:15:07.072557
1809	25	1	reversible-no-1	false	\N	2025-05-16 20:15:07.077703	2025-05-16 20:15:07.077707
1811	25	1	reversible-yes-2	false	\N	2025-05-16 20:15:07.082858	2025-05-16 20:15:07.082862
1813	25	1	publicity-no-3	no	\N	2025-05-16 20:15:07.088011	2025-05-16 20:15:07.088015
1815	25	1	publicity-yes-4	yes	\N	2025-05-16 20:15:07.093621	2025-05-16 20:15:07.093626
1817	25	1	tentative-choice-1	false	\N	2025-05-16 20:15:07.099453	2025-05-16 20:15:07.099457
1819	24	10	stakeholder-name-0	Bob	\N	2025-05-16 20:15:07.112533	2025-05-16 20:15:07.112538
1820	24	10	stakeholder-directly-0	directly	\N	2025-05-16 20:15:07.115324	2025-05-16 20:15:07.115328
1821	24	10	stakeholder-indirectly-0	false	\N	2025-05-16 20:15:07.11797	2025-05-16 20:15:07.117975
1822	24	10	attentiveness-0	6	\N	2025-05-16 20:15:07.120522	2025-05-16 20:15:07.120527
1823	24	10	competence-0	8	\N	2025-05-16 20:15:07.123342	2025-05-16 20:15:07.123346
1824	24	10	responsiveness-0	7	\N	2025-05-16 20:15:07.126577	2025-05-16 20:15:07.126581
1825	24	10	stakeholder-name-1	Jim	\N	2025-05-16 20:15:07.129729	2025-05-16 20:15:07.129737
1826	24	10	stakeholder-directly-1	directly	\N	2025-05-16 20:15:07.132833	2025-05-16 20:15:07.132838
1827	24	10	stakeholder-indirectly-1	false	\N	2025-05-16 20:15:07.135618	2025-05-16 20:15:07.135623
1828	24	10	attentiveness-1	8	\N	2025-05-16 20:15:07.138184	2025-05-16 20:15:07.138188
1829	24	10	competence-1	7	\N	2025-05-16 20:15:07.143825	2025-05-16 20:15:07.143836
1830	24	10	responsiveness-1	2	\N	2025-05-16 20:15:07.151473	2025-05-16 20:15:07.151481
1831	24	10	stakeholder-name-2	Cindy	\N	2025-05-16 20:15:07.154945	2025-05-16 20:15:07.154952
1832	24	10	stakeholder-directly-2	false	\N	2025-05-16 20:15:07.158219	2025-05-16 20:15:07.158226
1833	24	10	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:15:07.162678	2025-05-16 20:15:07.162684
1834	24	10	attentiveness-2	5	\N	2025-05-16 20:15:07.165428	2025-05-16 20:15:07.165435
1835	24	10	competence-2	8	\N	2025-05-16 20:15:07.168391	2025-05-16 20:15:07.168396
1836	24	10	responsiveness-2	9	\N	2025-05-16 20:15:07.171334	2025-05-16 20:15:07.171341
1837	24	10	competence-3	8	\N	2025-05-16 20:15:07.180159	2025-05-16 20:15:07.180167
1838	24	10	attentiveness-4	8	\N	2025-05-16 20:15:07.183488	2025-05-16 20:15:07.183494
1839	24	10	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:15:07.189847	2025-05-16 20:15:07.189856
1840	24	10	stakeholder-directly-6	directly	\N	2025-05-16 20:15:07.193225	2025-05-16 20:15:07.193232
1841	24	10	results-1-ce	responsivness, because it was less responsive	\N	2025-05-16 20:15:07.196189	2025-05-16 20:15:07.196197
1842	24	10	stakeholder-name-3	Samantha	\N	2025-05-16 20:15:07.201174	2025-05-16 20:15:07.20118
1843	24	10	responsiveness-3	2	\N	2025-05-16 20:15:07.204326	2025-05-16 20:15:07.204332
1844	24	10	competence-4	2	\N	2025-05-16 20:15:07.207304	2025-05-16 20:15:07.20731
1845	24	10	attentiveness-5	9	\N	2025-05-16 20:15:07.210329	2025-05-16 20:15:07.210335
1846	24	10	stakeholder-indirectly-6	false	\N	2025-05-16 20:15:07.21352	2025-05-16 20:15:07.213526
1847	24	10	results-2-ce	yes	\N	2025-05-16 20:15:07.219274	2025-05-16 20:15:07.21928
1848	24	10	stakeholder-directly-3	directly	\N	2025-05-16 20:15:07.224081	2025-05-16 20:15:07.224088
1849	24	10	stakeholder-name-4	Jeff	\N	2025-05-16 20:15:07.231379	2025-05-16 20:15:07.231386
1850	24	10	responsiveness-4	0	\N	2025-05-16 20:15:07.242495	2025-05-16 20:15:07.242502
1851	24	10	competence-5	3	\N	2025-05-16 20:15:07.248226	2025-05-16 20:15:07.248234
1852	24	10	attentiveness-6	8	\N	2025-05-16 20:15:07.255039	2025-05-16 20:15:07.255045
1853	24	10	num_stakeholders	7	\N	2025-05-16 20:15:07.25819	2025-05-16 20:15:07.258196
1854	24	10	stakeholder-indirectly-3	false	\N	2025-05-16 20:15:07.261543	2025-05-16 20:15:07.261548
1855	24	10	stakeholder-directly-4	false	\N	2025-05-16 20:15:07.264974	2025-05-16 20:15:07.264979
1856	24	10	stakeholder-name-5	Carol	\N	2025-05-16 20:15:07.267755	2025-05-16 20:15:07.267759
1857	24	10	responsiveness-5	8	\N	2025-05-16 20:15:07.270351	2025-05-16 20:15:07.270356
1858	24	10	competence-6	9	\N	2025-05-16 20:15:07.272957	2025-05-16 20:15:07.27296
1859	24	10	cumulative-score	6	\N	2025-05-16 20:15:07.275489	2025-05-16 20:15:07.275493
1860	24	10	attentiveness-3	6	\N	2025-05-16 20:15:07.278173	2025-05-16 20:15:07.278178
1861	24	10	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:15:07.280817	2025-05-16 20:15:07.280821
1862	24	10	stakeholder-directly-5	false	\N	2025-05-16 20:15:07.28339	2025-05-16 20:15:07.283394
1863	24	10	stakeholder-name-6	Charles	\N	2025-05-16 20:15:07.286127	2025-05-16 20:15:07.286131
1864	24	10	responsiveness-6	7	\N	2025-05-16 20:15:07.288653	2025-05-16 20:15:07.288657
1865	24	5	moral-virtues	Honesty	\N	2025-05-16 20:15:07.291716	2025-05-16 20:15:07.29172
1866	25	5	moral-virtues	Honesty	\N	2025-05-16 20:15:07.29419	2025-05-16 20:15:07.294193
1867	24	5	primary-virtue-always	be honest	\N	2025-05-16 20:15:07.29662	2025-05-16 20:15:07.296623
1868	25	5	primary-virtue-always	be honest	\N	2025-05-16 20:15:07.299086	2025-05-16 20:15:07.299089
1869	24	5	primary-virtue-never	be dishonest	\N	2025-05-16 20:15:07.30151	2025-05-16 20:15:07.301514
1870	25	5	primary-virtue-never	be dishonest	\N	2025-05-16 20:15:07.304187	2025-05-16 20:15:07.304191
1871	24	5	universalizability-pass	false	\N	2025-05-16 20:15:07.306827	2025-05-16 20:15:07.306831
1872	25	5	universalizability-pass	false	\N	2025-05-16 20:15:07.309359	2025-05-16 20:15:07.309363
1873	24	5	universalizability-fail	fail	\N	2025-05-16 20:15:07.31252	2025-05-16 20:15:07.312524
1874	25	5	universalizability-fail	fail	\N	2025-05-16 20:15:07.315868	2025-05-16 20:15:07.315873
1875	24	5	consistency-pass	pass	\N	2025-05-16 20:15:07.318472	2025-05-16 20:15:07.318476
1876	25	5	consistency-pass	pass	\N	2025-05-16 20:15:07.321026	2025-05-16 20:15:07.32103
1877	24	5	consistency-fail	false	\N	2025-05-16 20:15:07.323599	2025-05-16 20:15:07.323603
1878	25	5	consistency-fail	false	\N	2025-05-16 20:15:07.32645	2025-05-16 20:15:07.326455
1879	24	2	inverse-short-term-0	1	\N	2025-05-16 20:15:07.329996	2025-05-16 20:15:07.330004
1880	25	2	inverse-short-term-0	1	\N	2025-05-16 20:15:07.333095	2025-05-16 20:15:07.3331
1881	24	2	stakeholder-indirectly-1	false	\N	2025-05-16 20:15:07.336968	2025-05-16 20:15:07.336975
1882	25	2	stakeholder-indirectly-1	false	\N	2025-05-16 20:15:07.340373	2025-05-16 20:15:07.34038
1883	24	2	stakeholder-name-2	Cindy	\N	2025-05-16 20:15:07.34349	2025-05-16 20:15:07.343498
1884	25	2	stakeholder-name-2	Cindy	\N	2025-05-16 20:15:07.34652	2025-05-16 20:15:07.346526
1885	24	2	long-term-2	1	\N	2025-05-16 20:15:07.350027	2025-05-16 20:15:07.350033
1886	25	2	long-term-2	1	\N	2025-05-16 20:15:07.353056	2025-05-16 20:15:07.353062
1887	24	2	short-term-3	1	\N	2025-05-16 20:15:07.356124	2025-05-16 20:15:07.356129
1888	25	2	short-term-3	1	\N	2025-05-16 20:15:07.361178	2025-05-16 20:15:07.361184
1889	24	2	stakeholder-directly-4	false	\N	2025-05-16 20:15:07.36789	2025-05-16 20:15:07.367896
1890	25	2	stakeholder-directly-4	false	\N	2025-05-16 20:15:07.370759	2025-05-16 20:15:07.370764
1891	24	2	inverse-long-term-4	4	\N	2025-05-16 20:15:07.373396	2025-05-16 20:15:07.373403
1892	25	2	inverse-long-term-4	4	\N	2025-05-16 20:15:07.378461	2025-05-16 20:15:07.378468
1893	24	2	inverse-short-term-5	1	\N	2025-05-16 20:15:07.381571	2025-05-16 20:15:07.381577
1894	25	2	inverse-short-term-5	1	\N	2025-05-16 20:15:07.384842	2025-05-16 20:15:07.384848
1895	24	2	stakeholder-indirectly-6	false	\N	2025-05-16 20:15:07.396008	2025-05-16 20:15:07.396016
1896	25	2	stakeholder-indirectly-6	false	\N	2025-05-16 20:15:07.402757	2025-05-16 20:15:07.402764
1897	24	2	unranked-short-term	42.86	\N	2025-05-16 20:15:07.411019	2025-05-16 20:15:07.411026
1898	25	2	unranked-short-term	42.86	\N	2025-05-16 20:15:07.413983	2025-05-16 20:15:07.413989
1899	24	2	topic-2	yes	\N	2025-05-16 20:15:07.423291	2025-05-16 20:15:07.423298
1900	25	2	topic-2	yes	\N	2025-05-16 20:15:07.426955	2025-05-16 20:15:07.426963
1901	24	2	stakeholder-name-0	Bob	\N	2025-05-16 20:15:07.430831	2025-05-16 20:15:07.430837
1902	25	2	stakeholder-name-0	Bob	\N	2025-05-16 20:15:07.43405	2025-05-16 20:15:07.434057
1903	24	2	long-term-0	4	\N	2025-05-16 20:15:07.437249	2025-05-16 20:15:07.437253
1904	25	2	long-term-0	4	\N	2025-05-16 20:15:07.440933	2025-05-16 20:15:07.440939
1905	24	2	short-term-1	4	\N	2025-05-16 20:15:07.443853	2025-05-16 20:15:07.443857
1906	25	2	short-term-1	4	\N	2025-05-16 20:15:07.446681	2025-05-16 20:15:07.446685
1907	24	2	stakeholder-directly-2	false	\N	2025-05-16 20:15:07.449587	2025-05-16 20:15:07.449591
1908	25	2	stakeholder-directly-2	false	\N	2025-05-16 20:15:07.452515	2025-05-16 20:15:07.452518
1909	24	2	inverse-long-term-2	4	\N	2025-05-16 20:15:07.4557	2025-05-16 20:15:07.455703
1910	25	2	inverse-long-term-2	4	\N	2025-05-16 20:15:07.458953	2025-05-16 20:15:07.458957
1911	24	2	inverse-short-term-3	4	\N	2025-05-16 20:15:07.461999	2025-05-16 20:15:07.462009
1912	25	2	inverse-short-term-3	4	\N	2025-05-16 20:15:07.465243	2025-05-16 20:15:07.465247
1913	24	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:15:07.468463	2025-05-16 20:15:07.468467
1914	25	2	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:15:07.473855	2025-05-16 20:15:07.473862
1915	24	2	stakeholder-name-5	Carol	\N	2025-05-16 20:15:07.476822	2025-05-16 20:15:07.476827
1916	25	2	stakeholder-name-5	Carol	\N	2025-05-16 20:15:07.47983	2025-05-16 20:15:07.479835
1917	24	2	long-term-5	5	\N	2025-05-16 20:15:07.482837	2025-05-16 20:15:07.482842
1918	25	2	long-term-5	5	\N	2025-05-16 20:15:07.485951	2025-05-16 20:15:07.485956
1919	24	2	short-term-6	1	\N	2025-05-16 20:15:07.492747	2025-05-16 20:15:07.492753
1920	25	2	short-term-6	1	\N	2025-05-16 20:15:07.495932	2025-05-16 20:15:07.495937
1921	24	2	unranked-long-term	34.29	\N	2025-05-16 20:15:07.498657	2025-05-16 20:15:07.498662
1922	25	2	unranked-long-term	34.29	\N	2025-05-16 20:15:07.501313	2025-05-16 20:15:07.501318
1923	24	2	topic-3	unreliable	\N	2025-05-16 20:15:07.504118	2025-05-16 20:15:07.504122
1924	25	2	topic-3	unreliable	\N	2025-05-16 20:15:07.510015	2025-05-16 20:15:07.510022
1925	24	2	stakeholder-directly-0	directly	\N	2025-05-16 20:15:07.51498	2025-05-16 20:15:07.514986
1926	25	2	stakeholder-directly-0	directly	\N	2025-05-16 20:15:07.517735	2025-05-16 20:15:07.517742
1927	24	2	inverse-long-term-0	1	\N	2025-05-16 20:15:07.520602	2025-05-16 20:15:07.520607
1928	25	2	inverse-long-term-0	1	\N	2025-05-16 20:15:07.523249	2025-05-16 20:15:07.523253
1929	24	2	inverse-short-term-1	1	\N	2025-05-16 20:15:07.525842	2025-05-16 20:15:07.525846
1930	25	2	inverse-short-term-1	1	\N	2025-05-16 20:15:07.528367	2025-05-16 20:15:07.528371
1931	24	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:15:07.532824	2025-05-16 20:15:07.532828
1932	25	2	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:15:07.535634	2025-05-16 20:15:07.535638
1933	24	2	stakeholder-name-3	Samantha	\N	2025-05-16 20:15:07.538233	2025-05-16 20:15:07.538237
1934	25	2	stakeholder-name-3	Samantha	\N	2025-05-16 20:15:07.54058	2025-05-16 20:15:07.540583
1935	24	2	long-term-3	4	\N	2025-05-16 20:15:07.542959	2025-05-16 20:15:07.542963
1936	25	2	long-term-3	4	\N	2025-05-16 20:15:07.545336	2025-05-16 20:15:07.545339
1937	24	2	short-term-4	5	\N	2025-05-16 20:15:07.549975	2025-05-16 20:15:07.54998
1938	25	2	short-term-4	5	\N	2025-05-16 20:15:07.552655	2025-05-16 20:15:07.552659
1939	24	2	stakeholder-directly-5	false	\N	2025-05-16 20:15:07.555906	2025-05-16 20:15:07.555912
1940	25	2	stakeholder-directly-5	false	\N	2025-05-16 20:15:07.558929	2025-05-16 20:15:07.558934
1941	24	2	inverse-long-term-5	0	\N	2025-05-16 20:15:07.562024	2025-05-16 20:15:07.56203
1942	25	2	inverse-long-term-5	0	\N	2025-05-16 20:15:07.567389	2025-05-16 20:15:07.567398
1943	24	2	inverse-short-term-6	4	\N	2025-05-16 20:15:07.570929	2025-05-16 20:15:07.570935
1944	25	2	inverse-short-term-6	4	\N	2025-05-16 20:15:07.578509	2025-05-16 20:15:07.578519
1945	24	2	ranked-short-term	39.29	\N	2025-05-16 20:15:07.581994	2025-05-16 20:15:07.582
1946	25	2	ranked-short-term	39.29	\N	2025-05-16 20:15:07.584883	2025-05-16 20:15:07.584889
1947	24	2	cumulative-score	0	\N	2025-05-16 20:15:07.587461	2025-05-16 20:15:07.587465
1948	25	2	cumulative-score	0	\N	2025-05-16 20:15:07.592325	2025-05-16 20:15:07.592331
1949	24	2	stakeholder-indirectly-0	false	\N	2025-05-16 20:15:07.595598	2025-05-16 20:15:07.595604
1950	25	2	stakeholder-indirectly-0	false	\N	2025-05-16 20:15:07.598761	2025-05-16 20:15:07.598768
1951	24	2	stakeholder-name-1	Jim	\N	2025-05-16 20:15:07.601887	2025-05-16 20:15:07.601894
1952	25	2	stakeholder-name-1	Jim	\N	2025-05-16 20:15:07.604762	2025-05-16 20:15:07.604767
1953	24	2	long-term-1	4	\N	2025-05-16 20:15:07.61103	2025-05-16 20:15:07.61104
1954	25	2	long-term-1	4	\N	2025-05-16 20:15:07.615052	2025-05-16 20:15:07.615061
1955	24	2	short-term-2	1	\N	2025-05-16 20:15:07.622722	2025-05-16 20:15:07.622732
1956	25	2	short-term-2	1	\N	2025-05-16 20:15:07.625991	2025-05-16 20:15:07.625999
1957	24	2	stakeholder-directly-3	directly	\N	2025-05-16 20:15:07.628836	2025-05-16 20:15:07.628842
1958	25	2	stakeholder-directly-3	directly	\N	2025-05-16 20:15:07.63591	2025-05-16 20:15:07.635916
1959	24	2	inverse-long-term-3	1	\N	2025-05-16 20:15:07.638913	2025-05-16 20:15:07.638918
1960	25	2	inverse-long-term-3	1	\N	2025-05-16 20:15:07.641978	2025-05-16 20:15:07.641983
1961	24	2	inverse-short-term-4	0	\N	2025-05-16 20:15:07.644733	2025-05-16 20:15:07.644738
1962	25	2	inverse-short-term-4	0	\N	2025-05-16 20:15:07.647393	2025-05-16 20:15:07.647397
1963	24	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:15:07.650052	2025-05-16 20:15:07.650056
1964	25	2	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:15:07.652674	2025-05-16 20:15:07.652677
1965	24	2	stakeholder-name-6	Charles	\N	2025-05-16 20:15:07.65529	2025-05-16 20:15:07.655295
1966	25	2	stakeholder-name-6	Charles	\N	2025-05-16 20:15:07.658086	2025-05-16 20:15:07.65809
1967	24	2	long-term-6	4	\N	2025-05-16 20:15:07.660961	2025-05-16 20:15:07.660965
1968	25	2	long-term-6	4	\N	2025-05-16 20:15:07.664789	2025-05-16 20:15:07.664815
1969	24	2	ranked-long-term	35.71	\N	2025-05-16 20:15:07.668107	2025-05-16 20:15:07.668112
1970	25	2	ranked-long-term	35.71	\N	2025-05-16 20:15:07.671007	2025-05-16 20:15:07.671012
1971	24	2	num_stakeholders	7	\N	2025-05-16 20:15:07.673686	2025-05-16 20:15:07.673691
1972	25	2	num_stakeholders	7	\N	2025-05-16 20:15:07.676401	2025-05-16 20:15:07.676405
1973	24	2	short-term-0	4	\N	2025-05-16 20:15:07.679073	2025-05-16 20:15:07.679078
1974	25	2	short-term-0	4	\N	2025-05-16 20:15:07.681746	2025-05-16 20:15:07.68175
1975	24	2	stakeholder-directly-1	directly	\N	2025-05-16 20:15:07.684647	2025-05-16 20:15:07.684652
1976	25	2	stakeholder-directly-1	directly	\N	2025-05-16 20:15:07.687923	2025-05-16 20:15:07.687929
1977	24	2	inverse-long-term-1	1	\N	2025-05-16 20:15:07.690882	2025-05-16 20:15:07.690887
1978	25	2	inverse-long-term-1	1	\N	2025-05-16 20:15:07.694208	2025-05-16 20:15:07.694215
1979	24	2	inverse-short-term-2	4	\N	2025-05-16 20:15:07.697793	2025-05-16 20:15:07.697815
1980	25	2	inverse-short-term-2	4	\N	2025-05-16 20:15:07.70089	2025-05-16 20:15:07.700896
1981	24	2	stakeholder-indirectly-3	false	\N	2025-05-16 20:15:07.70399	2025-05-16 20:15:07.703996
1982	25	2	stakeholder-indirectly-3	false	\N	2025-05-16 20:15:07.706855	2025-05-16 20:15:07.706861
1983	24	2	stakeholder-name-4	Jeff	\N	2025-05-16 20:15:07.70962	2025-05-16 20:15:07.709626
1984	25	2	stakeholder-name-4	Jeff	\N	2025-05-16 20:15:07.712582	2025-05-16 20:15:07.712589
1985	24	2	long-term-4	1	\N	2025-05-16 20:15:07.715404	2025-05-16 20:15:07.71541
1986	25	2	long-term-4	1	\N	2025-05-16 20:15:07.718125	2025-05-16 20:15:07.71813
1987	24	2	short-term-5	4	\N	2025-05-16 20:15:07.721103	2025-05-16 20:15:07.721108
1988	25	2	short-term-5	4	\N	2025-05-16 20:15:07.724038	2025-05-16 20:15:07.724044
1989	24	2	stakeholder-directly-6	directly	\N	2025-05-16 20:15:07.730096	2025-05-16 20:15:07.730107
1990	25	2	stakeholder-directly-6	directly	\N	2025-05-16 20:15:07.733272	2025-05-16 20:15:07.733279
1991	24	2	inverse-long-term-6	1	\N	2025-05-16 20:15:07.736059	2025-05-16 20:15:07.736064
1992	25	2	inverse-long-term-6	1	\N	2025-05-16 20:15:07.738717	2025-05-16 20:15:07.738722
1993	24	2	topic-1	bad	\N	2025-05-16 20:15:07.741409	2025-05-16 20:15:07.741414
1994	25	2	topic-1	bad	\N	2025-05-16 20:15:07.74433	2025-05-16 20:15:07.744334
1995	24	3	pain-0	7	\N	2025-05-16 20:15:07.74755	2025-05-16 20:15:07.747555
1996	25	3	pain-0	7	\N	2025-05-16 20:15:07.750141	2025-05-16 20:15:07.750146
1997	24	3	pleasure-0	7	\N	2025-05-16 20:15:07.75317	2025-05-16 20:15:07.753176
1998	25	3	pleasure-0	7	\N	2025-05-16 20:15:07.756345	2025-05-16 20:15:07.756351
1999	24	3	pain-1	8	\N	2025-05-16 20:15:07.759316	2025-05-16 20:15:07.759323
2000	25	3	pain-1	8	\N	2025-05-16 20:15:07.762224	2025-05-16 20:15:07.762228
2001	24	3	pleasure-1	7	\N	2025-05-16 20:15:07.764933	2025-05-16 20:15:07.764937
2002	25	3	pleasure-1	7	\N	2025-05-16 20:15:07.767605	2025-05-16 20:15:07.76761
2003	24	3	pain-2	8	\N	2025-05-16 20:15:07.770438	2025-05-16 20:15:07.770443
2004	25	3	pain-2	8	\N	2025-05-16 20:15:07.772959	2025-05-16 20:15:07.772962
2005	24	3	pleasure-2	1	\N	2025-05-16 20:15:07.775415	2025-05-16 20:15:07.775419
2006	25	3	pleasure-2	1	\N	2025-05-16 20:15:07.778084	2025-05-16 20:15:07.77809
2007	24	3	pain-3	2	\N	2025-05-16 20:15:07.781087	2025-05-16 20:15:07.781092
2008	25	3	pain-3	2	\N	2025-05-16 20:15:07.784314	2025-05-16 20:15:07.78432
2009	24	3	pleasure-3	2	\N	2025-05-16 20:15:07.787182	2025-05-16 20:15:07.787189
2010	25	3	pleasure-3	2	\N	2025-05-16 20:15:07.790307	2025-05-16 20:15:07.790312
2011	24	3	pleasure-4	8	\N	2025-05-16 20:15:07.793	2025-05-16 20:15:07.793005
2012	25	3	pleasure-4	8	\N	2025-05-16 20:15:07.796286	2025-05-16 20:15:07.796292
2013	24	3	pain-5	8	\N	2025-05-16 20:15:07.799344	2025-05-16 20:15:07.799351
2014	25	3	pain-5	8	\N	2025-05-16 20:15:07.802273	2025-05-16 20:15:07.802278
2015	24	3	pain-6	2	\N	2025-05-16 20:15:07.804898	2025-05-16 20:15:07.804902
2016	25	3	pain-6	2	\N	2025-05-16 20:15:07.808006	2025-05-16 20:15:07.808014
2017	24	3	pleasure-6	7	\N	2025-05-16 20:15:07.811128	2025-05-16 20:15:07.811136
2018	25	3	pleasure-6	7	\N	2025-05-16 20:15:07.814323	2025-05-16 20:15:07.814329
2019	24	3	total-pleasure	175	\N	2025-05-16 20:15:07.818628	2025-05-16 20:15:07.818634
2020	25	3	total-pleasure	175	\N	2025-05-16 20:15:07.822073	2025-05-16 20:15:07.82208
2021	24	3	total-pain	66	\N	2025-05-16 20:15:07.825105	2025-05-16 20:15:07.825111
2022	25	3	total-pain	66	\N	2025-05-16 20:15:07.827972	2025-05-16 20:15:07.827977
2023	24	3	pleasure-pain-ratio	73	\N	2025-05-16 20:15:07.830759	2025-05-16 20:15:07.830764
2024	25	3	pleasure-pain-ratio	73	\N	2025-05-16 20:15:07.833457	2025-05-16 20:15:07.833464
2025	24	3	cumulative-score	10	\N	2025-05-16 20:15:07.836186	2025-05-16 20:15:07.83619
2026	25	3	cumulative-score	10	\N	2025-05-16 20:15:07.838792	2025-05-16 20:15:07.838812
2027	24	4	mill-pain-0	3	\N	2025-05-16 20:15:07.842163	2025-05-16 20:15:07.842167
2028	25	4	mill-pain-0	3	\N	2025-05-16 20:15:07.844848	2025-05-16 20:15:07.844851
2029	24	4	mill-pleasure-0	1	\N	2025-05-16 20:15:07.847282	2025-05-16 20:15:07.847286
2030	25	4	mill-pleasure-0	1	\N	2025-05-16 20:15:07.849749	2025-05-16 20:15:07.849753
2031	24	4	mill-pain-1	3	\N	2025-05-16 20:15:07.852057	2025-05-16 20:15:07.85206
2032	25	4	mill-pain-1	3	\N	2025-05-16 20:15:07.854294	2025-05-16 20:15:07.854298
2033	24	4	mill-pleasure-1	2	\N	2025-05-16 20:15:07.856659	2025-05-16 20:15:07.856664
2034	25	4	mill-pleasure-1	2	\N	2025-05-16 20:15:07.859095	2025-05-16 20:15:07.859099
2035	24	4	mill-pain-2	7	\N	2025-05-16 20:15:07.861336	2025-05-16 20:15:07.86134
2036	25	4	mill-pain-2	7	\N	2025-05-16 20:15:07.864046	2025-05-16 20:15:07.86405
2037	24	4	mill-pleasure-2	2	\N	2025-05-16 20:15:07.866555	2025-05-16 20:15:07.866579
2038	25	4	mill-pleasure-2	2	\N	2025-05-16 20:15:07.869068	2025-05-16 20:15:07.869072
2039	24	4	mill-pain-3	7	\N	2025-05-16 20:15:07.871499	2025-05-16 20:15:07.871502
2040	25	4	mill-pain-3	7	\N	2025-05-16 20:15:07.87398	2025-05-16 20:15:07.873984
2041	24	4	mill-pleasure-3	7	\N	2025-05-16 20:15:07.876354	2025-05-16 20:15:07.876358
2042	25	4	mill-pleasure-3	7	\N	2025-05-16 20:15:07.87907	2025-05-16 20:15:07.879076
2043	24	4	mill-pleasure-4	2	\N	2025-05-16 20:15:07.882017	2025-05-16 20:15:07.882021
2044	25	4	mill-pleasure-4	2	\N	2025-05-16 20:15:07.884925	2025-05-16 20:15:07.884931
2045	24	4	mill-pain-5	2	\N	2025-05-16 20:15:07.887818	2025-05-16 20:15:07.887823
2046	25	4	mill-pain-5	2	\N	2025-05-16 20:15:07.890359	2025-05-16 20:15:07.890364
2047	24	4	mill-pain-6	8	\N	2025-05-16 20:15:07.892957	2025-05-16 20:15:07.892962
2048	25	4	mill-pain-6	8	\N	2025-05-16 20:15:07.895417	2025-05-16 20:15:07.895421
2049	24	4	mill-pleasure-6	6	\N	2025-05-16 20:15:07.898412	2025-05-16 20:15:07.898417
2050	25	4	mill-pleasure-6	6	\N	2025-05-16 20:15:07.901713	2025-05-16 20:15:07.901718
2051	24	4	reflection	yes	\N	2025-05-16 20:15:07.904984	2025-05-16 20:15:07.90499
2052	25	4	reflection	yes	\N	2025-05-16 20:15:07.908247	2025-05-16 20:15:07.908253
2053	24	4	mill-total-pleasure	84	\N	2025-05-16 20:15:07.911457	2025-05-16 20:15:07.911462
2054	25	4	mill-total-pleasure	84	\N	2025-05-16 20:15:07.914517	2025-05-16 20:15:07.914522
2055	24	4	mill-total-pain	176	\N	2025-05-16 20:15:07.91772	2025-05-16 20:15:07.917725
2056	25	4	mill-total-pain	176	\N	2025-05-16 20:15:07.920489	2025-05-16 20:15:07.920494
2057	24	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 20:15:07.922956	2025-05-16 20:15:07.922961
2058	25	4	mill-pleasure-pain-ratio	32	\N	2025-05-16 20:15:07.925342	2025-05-16 20:15:07.925346
2059	24	4	cumulative-score	0	\N	2025-05-16 20:15:07.928013	2025-05-16 20:15:07.928019
2060	25	4	cumulative-score	0	\N	2025-05-16 20:15:07.9307	2025-05-16 20:15:07.930705
2061	24	6	universal-response	not very consistent	\N	2025-05-16 20:15:07.933794	2025-05-16 20:15:07.933815
2062	24	6	decision-response	yes	\N	2025-05-16 20:15:07.936267	2025-05-16 20:15:07.936271
2063	24	6	better-world-response	probably	\N	2025-05-16 20:15:07.938793	2025-05-16 20:15:07.938819
2064	24	8	fidelity-slider-1	7	\N	2025-05-16 20:15:07.942284	2025-05-16 20:15:07.942289
2065	24	8	fidelity-slider-2	2	\N	2025-05-16 20:15:07.944961	2025-05-16 20:15:07.944965
2066	24	8	reparation-slider-1	2	\N	2025-05-16 20:15:07.947449	2025-05-16 20:15:07.947454
2067	24	8	reparation-slider-2	2	\N	2025-05-16 20:15:07.950433	2025-05-16 20:15:07.950439
2068	24	8	gratitude-slider-1	8	\N	2025-05-16 20:15:07.953385	2025-05-16 20:15:07.953391
2069	24	8	gratitude-slider-2	7	\N	2025-05-16 20:15:07.956628	2025-05-16 20:15:07.956634
2070	24	8	topic-1-dva	Not really	\N	2025-05-16 20:15:07.959445	2025-05-16 20:15:07.959451
2071	24	8	topic-2-dva	more important	\N	2025-05-16 20:15:07.962265	2025-05-16 20:15:07.962272
2072	24	8	percentage-action-taken	65	\N	2025-05-16 20:15:07.965826	2025-05-16 20:15:07.965835
2073	24	8	cumulative-score	7	\N	2025-05-16 20:15:07.969177	2025-05-16 20:15:07.969183
2074	24	12	slider-0	2	\N	2025-05-16 20:15:07.97263	2025-05-16 20:15:07.972637
2075	24	12	slider-1	2	\N	2025-05-16 20:15:07.975662	2025-05-16 20:15:07.975668
2076	24	12	slider-2	2	\N	2025-05-16 20:15:07.978293	2025-05-16 20:15:07.978297
2077	24	12	topic-sg-0	it just is	\N	2025-05-16 20:15:07.981205	2025-05-16 20:15:07.98121
2078	24	12	topic-sg-1	kind of	\N	2025-05-16 20:15:07.984054	2025-05-16 20:15:07.984059
2079	24	12	topic-sg-2	no and no	\N	2025-05-16 20:15:07.987553	2025-05-16 20:15:07.987572
2080	24	12	num-sliders	3	\N	2025-05-16 20:15:07.990793	2025-05-16 20:15:07.99082
2081	24	12	cumulative-score	2	\N	2025-05-16 20:15:07.993958	2025-05-16 20:15:07.993965
2082	24	11	num_stakeholders	7	\N	2025-05-16 20:15:07.997537	2025-05-16 20:15:07.997543
2083	24	11	ableism-0	15	\N	2025-05-16 20:15:08.00074	2025-05-16 20:15:08.000745
2084	24	11	sexism-1	5	\N	2025-05-16 20:15:08.003702	2025-05-16 20:15:08.003706
2085	24	11	stakeholder-directly-2	false	\N	2025-05-16 20:15:08.007218	2025-05-16 20:15:08.007225
2086	24	11	ageism-2	12	\N	2025-05-16 20:15:08.010332	2025-05-16 20:15:08.010338
2087	24	11	racism-3	13	\N	2025-05-16 20:15:08.013283	2025-05-16 20:15:08.013291
2088	24	11	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:15:08.016108	2025-05-16 20:15:08.016114
2089	24	11	stakeholder-name-5	Carol	\N	2025-05-16 20:15:08.019114	2025-05-16 20:15:08.019119
2090	24	11	ableism-5	5	\N	2025-05-16 20:15:08.021784	2025-05-16 20:15:08.021788
2091	24	11	sexism-6	5	\N	2025-05-16 20:15:08.024302	2025-05-16 20:15:08.024306
2092	24	11	results-2	neither	\N	2025-05-16 20:15:08.027495	2025-05-16 20:15:08.0275
2093	24	11	stakeholder-directly-0	directly	\N	2025-05-16 20:15:08.030261	2025-05-16 20:15:08.030267
2094	24	11	ageism-0	15	\N	2025-05-16 20:15:08.033029	2025-05-16 20:15:08.033034
2095	24	11	racism-1	5	\N	2025-05-16 20:15:08.036091	2025-05-16 20:15:08.036096
2096	24	11	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:15:08.038549	2025-05-16 20:15:08.038554
2097	24	11	stakeholder-name-3	Samantha	\N	2025-05-16 20:15:08.040995	2025-05-16 20:15:08.040999
2098	24	11	ableism-3	13	\N	2025-05-16 20:15:08.043326	2025-05-16 20:15:08.04333
2099	24	11	sexism-4	5	\N	2025-05-16 20:15:08.04574	2025-05-16 20:15:08.045743
2100	24	11	stakeholder-directly-5	false	\N	2025-05-16 20:15:08.048024	2025-05-16 20:15:08.048028
2101	24	11	ageism-5	2	\N	2025-05-16 20:15:08.050731	2025-05-16 20:15:08.050735
2102	24	11	racism-6	16	\N	2025-05-16 20:15:08.053433	2025-05-16 20:15:08.053437
2103	24	11	results-3	probably	\N	2025-05-16 20:15:08.056046	2025-05-16 20:15:08.05605
2104	24	11	stakeholder-indirectly-0	false	\N	2025-05-16 20:15:08.058659	2025-05-16 20:15:08.058663
2105	24	11	stakeholder-name-1	Jim	\N	2025-05-16 20:15:08.061543	2025-05-16 20:15:08.061547
2106	24	11	ableism-1	5	\N	2025-05-16 20:15:08.064197	2025-05-16 20:15:08.064202
2107	24	11	sexism-2	6	\N	2025-05-16 20:15:08.066763	2025-05-16 20:15:08.066767
2108	24	11	stakeholder-directly-3	directly	\N	2025-05-16 20:15:08.069534	2025-05-16 20:15:08.069538
2109	24	11	ageism-3	5	\N	2025-05-16 20:15:08.073004	2025-05-16 20:15:08.073009
2110	24	11	racism-4	7	\N	2025-05-16 20:15:08.07596	2025-05-16 20:15:08.075964
2111	24	11	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:15:08.079116	2025-05-16 20:15:08.079121
2112	24	11	stakeholder-name-6	Charles	\N	2025-05-16 20:15:08.082068	2025-05-16 20:15:08.082072
2113	24	11	ableism-6	3	\N	2025-05-16 20:15:08.084949	2025-05-16 20:15:08.084954
2114	24	11	cumulative-score	5	\N	2025-05-16 20:15:08.088143	2025-05-16 20:15:08.088148
2115	24	11	sexism-0	15	\N	2025-05-16 20:15:08.09164	2025-05-16 20:15:08.091646
2116	24	11	stakeholder-directly-1	directly	\N	2025-05-16 20:15:08.094676	2025-05-16 20:15:08.094681
2117	24	11	ageism-1	6	\N	2025-05-16 20:15:08.097608	2025-05-16 20:15:08.097616
2118	24	11	racism-2	15	\N	2025-05-16 20:15:08.100337	2025-05-16 20:15:08.100342
2119	24	11	stakeholder-indirectly-3	false	\N	2025-05-16 20:15:08.103274	2025-05-16 20:15:08.103278
2120	24	11	stakeholder-name-4	Jeff	\N	2025-05-16 20:15:08.106294	2025-05-16 20:15:08.106299
2121	24	11	ableism-4	12	\N	2025-05-16 20:15:08.108956	2025-05-16 20:15:08.108961
2122	24	11	sexism-5	14	\N	2025-05-16 20:15:08.111934	2025-05-16 20:15:08.11194
2123	24	11	stakeholder-directly-6	directly	\N	2025-05-16 20:15:08.114691	2025-05-16 20:15:08.114696
2124	24	11	ageism-6	15	\N	2025-05-16 20:15:08.117332	2025-05-16 20:15:08.117336
2125	24	11	stakeholder-name-0	Bob	\N	2025-05-16 20:15:08.119934	2025-05-16 20:15:08.119938
2126	24	11	racism-0	15	\N	2025-05-16 20:15:08.122358	2025-05-16 20:15:08.122363
2127	24	11	stakeholder-indirectly-1	false	\N	2025-05-16 20:15:08.125067	2025-05-16 20:15:08.125072
2128	24	11	stakeholder-name-2	Cindy	\N	2025-05-16 20:15:08.127754	2025-05-16 20:15:08.127758
2129	24	11	ableism-2	4	\N	2025-05-16 20:15:08.130273	2025-05-16 20:15:08.130277
2130	24	11	sexism-3	13	\N	2025-05-16 20:15:08.132666	2025-05-16 20:15:08.13267
2131	24	11	stakeholder-directly-4	false	\N	2025-05-16 20:15:08.135108	2025-05-16 20:15:08.135113
2132	24	11	ageism-4	17	\N	2025-05-16 20:15:08.13764	2025-05-16 20:15:08.137644
2133	24	11	racism-5	12	\N	2025-05-16 20:15:08.140038	2025-05-16 20:15:08.140042
2134	24	11	stakeholder-indirectly-6	false	\N	2025-05-16 20:15:08.142368	2025-05-16 20:15:08.142371
2135	24	11	results-1	its good	\N	2025-05-16 20:15:08.145159	2025-05-16 20:15:08.145164
2136	24	14	slider-value-0	7	\N	2025-05-16 20:15:08.148281	2025-05-16 20:15:08.148286
2137	24	14	slider-value-1	8	\N	2025-05-16 20:15:08.151034	2025-05-16 20:15:08.151038
2138	24	14	slider-value-2	9	\N	2025-05-16 20:15:08.153355	2025-05-16 20:15:08.153359
2139	24	14	response-1-lp	wrong	\N	2025-05-16 20:15:08.156091	2025-05-16 20:15:08.156095
2140	24	14	response-2-lp	sometimes	\N	2025-05-16 20:15:08.158873	2025-05-16 20:15:08.158878
2141	24	14	slider-scale-0	Ignorance,Wisdom	\N	2025-05-16 20:15:08.161491	2025-05-16 20:15:08.161497
2142	24	14	slider-scale-1	Hatred,Loving Kindness	\N	2025-05-16 20:15:08.164235	2025-05-16 20:15:08.16424
2143	24	14	slider-scale-2	Greed,Generosity	\N	2025-05-16 20:15:08.166872	2025-05-16 20:15:08.166878
2144	24	14	num-sliders-lp	3	\N	2025-05-16 20:15:08.169689	2025-05-16 20:15:08.169694
2145	24	14	cumulative-score	NaN	\N	2025-05-16 20:15:08.17255	2025-05-16 20:15:08.172554
2146	24	7	moral-duty-1	be good	\N	2025-05-16 20:15:08.17613	2025-05-16 20:15:08.176136
2147	24	7	slider-1	1	\N	2025-05-16 20:15:08.178997	2025-05-16 20:15:08.179002
2148	24	7	moral-duty-2	be bad	\N	2025-05-16 20:15:08.182445	2025-05-16 20:15:08.182449
2149	24	7	slider-2	10	\N	2025-05-16 20:15:08.190779	2025-05-16 20:15:08.190784
2150	24	7	moral-duty-3	be neutral	\N	2025-05-16 20:15:08.193838	2025-05-16 20:15:08.193844
2151	24	7	slider-3	5	\N	2025-05-16 20:15:08.196994	2025-05-16 20:15:08.197002
2152	24	7	num-sacrifices	3	\N	2025-05-16 20:15:08.200147	2025-05-16 20:15:08.200154
2153	24	7	average-sacrifice	5	\N	2025-05-16 20:15:08.203454	2025-05-16 20:15:08.20346
2154	24	7	cumulative-score	5	\N	2025-05-16 20:15:08.206592	2025-05-16 20:15:08.206598
2155	24	15	slider-reverence-for-life-value	7	\N	2025-05-16 20:15:08.210089	2025-05-16 20:15:08.210094
2156	24	15	slider-reverence-for-life	3	\N	2025-05-16 20:15:08.212881	2025-05-16 20:15:08.212886
2157	24	15	slider-interdependence-value	7	\N	2025-05-16 20:15:08.21551	2025-05-16 20:15:08.215514
2158	24	15	slider-interdependence	3	\N	2025-05-16 20:15:08.218048	2025-05-16 20:15:08.218052
2159	24	15	slider-society-responsibility-value	7	\N	2025-05-16 20:15:08.220476	2025-05-16 20:15:08.22048
2160	24	15	slider-society-responsibility	3	\N	2025-05-16 20:15:08.22333	2025-05-16 20:15:08.223335
2161	24	15	slider-global-justice-value	10	\N	2025-05-16 20:15:08.226427	2025-05-16 20:15:08.226433
2162	24	15	slider-global-justice	0	\N	2025-05-16 20:15:08.229443	2025-05-16 20:15:08.229447
2163	24	15	slider-environmental-stewardship-value	2	\N	2025-05-16 20:15:08.232444	2025-05-16 20:15:08.232449
2164	24	15	slider-environmental-stewardship	8	\N	2025-05-16 20:15:08.235449	2025-05-16 20:15:08.235454
2165	24	15	slider-reverence-for-place-value	2	\N	2025-05-16 20:15:08.238317	2025-05-16 20:15:08.238323
2166	24	15	slider-reverence-for-place	8	\N	2025-05-16 20:15:08.241316	2025-05-16 20:15:08.241321
2167	24	15	reflection-1-up	yes they always are	\N	2025-05-16 20:15:08.243958	2025-05-16 20:15:08.243963
2168	24	15	reflection-2-up	people are different	\N	2025-05-16 20:15:08.246512	2025-05-16 20:15:08.246516
2169	24	15	cumulative-score	-3	\N	2025-05-16 20:15:08.249312	2025-05-16 20:15:08.249317
2170	24	13	domain-1	thing 1	\N	2025-05-16 20:15:08.252127	2025-05-16 20:15:08.252131
2171	24	13	vice-1	17	\N	2025-05-16 20:15:08.254688	2025-05-16 20:15:08.254692
2172	24	13	domain-2	thing 2	\N	2025-05-16 20:15:08.257227	2025-05-16 20:15:08.257231
2173	24	13	vice-2	5	\N	2025-05-16 20:15:08.259771	2025-05-16 20:15:08.259776
2174	24	13	domain-3	thing 3	\N	2025-05-16 20:15:08.262254	2025-05-16 20:15:08.262258
2175	24	13	vice-3	10	\N	2025-05-16 20:15:08.264785	2025-05-16 20:15:08.264789
2176	24	13	domain-4	thing 4	\N	2025-05-16 20:15:08.267327	2025-05-16 20:15:08.267331
2177	24	13	vice-4	3	\N	2025-05-16 20:15:08.269934	2025-05-16 20:15:08.269938
2178	24	13	domain-5	thing 5	\N	2025-05-16 20:15:08.272496	2025-05-16 20:15:08.2725
2179	24	13	vice-5	17	\N	2025-05-16 20:15:08.275056	2025-05-16 20:15:08.275062
2180	24	13	question-ve	yes	\N	2025-05-16 20:15:08.277673	2025-05-16 20:15:08.277677
2181	24	13	reflection-ve	yes	\N	2025-05-16 20:15:08.280217	2025-05-16 20:15:08.280221
2182	24	13	num-domains	5	\N	2025-05-16 20:15:08.282838	2025-05-16 20:15:08.282842
2183	24	13	vv-average	5	\N	2025-05-16 20:15:08.28531	2025-05-16 20:15:08.285314
2184	24	13	cumulative-score	5	\N	2025-05-16 20:15:08.288708	2025-05-16 20:15:08.288716
2185	24	1	dilemma-2	false	\N	2025-05-16 20:15:25.84023	2025-05-16 20:15:25.783525
2186	24	1	dilemma-1	false	\N	2025-05-16 20:15:25.843518	2025-05-16 20:15:25.783525
2188	24	1	stakeholder-directly-0	directly	\N	2025-05-16 20:15:25.84864	2025-05-16 20:15:25.783525
2189	24	1	stakeholder-indirectly-0	false	\N	2025-05-16 20:15:25.850289	2025-05-16 20:15:25.783525
2190	24	1	stakeholder-directly-1	directly	\N	2025-05-16 20:15:25.851951	2025-05-16 20:15:25.783525
2191	24	1	stakeholder-indirectly-1	false	\N	2025-05-16 20:15:25.853428	2025-05-16 20:15:25.783525
2193	24	1	stakeholder-indirectly-2	indirectly	\N	2025-05-16 20:15:25.856083	2025-05-16 20:15:25.783525
2194	24	1	stakeholder-directly-3	directly	\N	2025-05-16 20:15:25.857285	2025-05-16 20:15:25.783525
2195	24	1	stakeholder-indirectly-3	false	\N	2025-05-16 20:15:25.858499	2025-05-16 20:15:25.783525
2196	24	1	stakeholder-directly-4	false	\N	2025-05-16 20:15:25.859845	2025-05-16 20:15:25.783525
2198	24	1	stakeholder-directly-5	false	\N	2025-05-16 20:15:25.862546	2025-05-16 20:15:25.783525
2199	24	1	stakeholder-indirectly-5	indirectly	\N	2025-05-16 20:15:25.864067	2025-05-16 20:15:25.783525
2200	24	1	stakeholder-directly-6	directly	\N	2025-05-16 20:15:25.86561	2025-05-16 20:15:25.783525
2201	24	1	stakeholder-indirectly-6	false	\N	2025-05-16 20:15:25.867101	2025-05-16 20:15:25.783525
2203	24	1	tentative-choice-1	false	\N	2025-05-16 20:15:25.870029	2025-05-16 20:15:25.783525
2204	24	1	tentative-choice-2	false	\N	2025-05-16 20:15:25.871333	2025-05-16 20:15:25.783525
2205	24	1	num_stakeholders	7	\N	2025-05-16 20:15:25.872759	2025-05-16 20:15:25.783525
2192	24	1	stakeholder-directly-2	false	\N	2025-05-16 20:15:25.854757	2025-05-16 20:15:25.783525
2197	24	1	stakeholder-indirectly-4	indirectly	\N	2025-05-16 20:15:25.861154	2025-05-16 20:15:25.783525
2202	24	1	tentative-choice-0	false	\N	2025-05-16 20:15:25.868601	2025-05-16 20:15:25.783525
2206	29	1	dilemma-0	false	\N	2025-05-16 20:32:57.107938	2025-05-16 20:32:57.0983
2208	29	1	dilemma-2	false	\N	2025-05-16 20:32:57.11437	2025-05-16 20:32:57.0983
2209	29	1	state-the-problem		\N	2025-05-16 20:32:57.11588	2025-05-16 20:32:57.0983
2210	29	1	gather-facts-1		\N	2025-05-16 20:32:57.117747	2025-05-16 20:32:57.0983
2212	29	1	gather-facts-3		\N	2025-05-16 20:32:57.120317	2025-05-16 20:32:57.0983
2213	29	1	stakeholder-name-0		\N	2025-05-16 20:32:57.121592	2025-05-16 20:32:57.0983
2214	29	1	stakeholder-directly-0	false	\N	2025-05-16 20:32:57.122877	2025-05-16 20:32:57.0983
2216	29	1	stakeholder-name-1		\N	2025-05-16 20:32:57.125686	2025-05-16 20:32:57.0983
2217	29	1	stakeholder-directly-1	false	\N	2025-05-16 20:32:57.127208	2025-05-16 20:32:57.0983
2218	29	1	stakeholder-indirectly-1	false	\N	2025-05-16 20:32:57.12857	2025-05-16 20:32:57.0983
2220	29	1	stakeholder-directly-2	false	\N	2025-05-16 20:32:57.131244	2025-05-16 20:32:57.0983
2221	29	1	stakeholder-indirectly-2	false	\N	2025-05-16 20:32:57.132493	2025-05-16 20:32:57.0983
2222	29	1	stakeholder-name-3		\N	2025-05-16 20:32:57.133756	2025-05-16 20:32:57.0983
2224	29	1	stakeholder-indirectly-3	false	\N	2025-05-16 20:32:57.136965	2025-05-16 20:32:57.0983
2225	29	1	stakeholder-name-4		\N	2025-05-16 20:32:57.138636	2025-05-16 20:32:57.0983
2226	29	1	stakeholder-directly-4	false	\N	2025-05-16 20:32:57.14022	2025-05-16 20:32:57.0983
2228	29	1	stakeholder-name-5		\N	2025-05-16 20:32:57.143022	2025-05-16 20:32:57.0983
2229	29	1	stakeholder-directly-5	false	\N	2025-05-16 20:32:57.144341	2025-05-16 20:32:57.0983
2230	29	1	stakeholder-indirectly-5	false	\N	2025-05-16 20:32:57.145627	2025-05-16 20:32:57.0983
2232	29	1	stakeholder-directly-6	false	\N	2025-05-16 20:32:57.148032	2025-05-16 20:32:57.0983
2233	29	1	stakeholder-indirectly-6	false	\N	2025-05-16 20:32:57.149458	2025-05-16 20:32:57.0983
2234	29	1	option-title-0		\N	2025-05-16 20:32:57.150602	2025-05-16 20:32:57.0983
2236	29	1	option-title-1		\N	2025-05-16 20:32:57.153197	2025-05-16 20:32:57.0983
2237	29	1	option-description-1		\N	2025-05-16 20:32:57.154421	2025-05-16 20:32:57.0983
2238	29	1	option-title-2		\N	2025-05-16 20:32:57.155642	2025-05-16 20:32:57.0983
2240	29	1	tentative-choice-0	false	\N	2025-05-16 20:32:57.158361	2025-05-16 20:32:57.0983
2241	29	1	tentative-choice-1	false	\N	2025-05-16 20:32:57.159571	2025-05-16 20:32:57.0983
2242	29	1	tentative-choice-2	false	\N	2025-05-16 20:32:57.160755	2025-05-16 20:32:57.0983
2244	30	1	dilemma-0	false	\N	2025-05-16 20:33:18.424659	2025-05-16 20:33:18.41998
2245	30	1	dilemma-2	false	\N	2025-05-16 20:33:18.426887	2025-05-16 20:33:18.41998
2246	30	1	dilemma-1	false	\N	2025-05-16 20:33:18.429625	2025-05-16 20:33:18.41998
2248	30	1	gather-facts-1		\N	2025-05-16 20:33:18.433953	2025-05-16 20:33:18.41998
2249	30	1	gather-facts-2		\N	2025-05-16 20:33:18.435934	2025-05-16 20:33:18.41998
2250	30	1	gather-facts-3		\N	2025-05-16 20:33:18.437303	2025-05-16 20:33:18.41998
2252	30	1	stakeholder-directly-0	false	\N	2025-05-16 20:33:18.439786	2025-05-16 20:33:18.41998
2253	30	1	stakeholder-indirectly-0	false	\N	2025-05-16 20:33:18.441021	2025-05-16 20:33:18.41998
2254	30	1	stakeholder-name-1		\N	2025-05-16 20:33:18.442469	2025-05-16 20:33:18.41998
2256	30	1	stakeholder-indirectly-1	false	\N	2025-05-16 20:33:18.445128	2025-05-16 20:33:18.41998
2257	30	1	stakeholder-name-2		\N	2025-05-16 20:33:18.446308	2025-05-16 20:33:18.41998
2258	30	1	stakeholder-directly-2	false	\N	2025-05-16 20:33:18.447434	2025-05-16 20:33:18.41998
2260	30	1	stakeholder-name-3		\N	2025-05-16 20:33:18.449672	2025-05-16 20:33:18.41998
2261	30	1	stakeholder-directly-3	false	\N	2025-05-16 20:33:18.450771	2025-05-16 20:33:18.41998
2262	30	1	stakeholder-indirectly-3	false	\N	2025-05-16 20:33:18.451916	2025-05-16 20:33:18.41998
2264	30	1	stakeholder-directly-4	false	\N	2025-05-16 20:33:18.454131	2025-05-16 20:33:18.41998
2265	30	1	stakeholder-indirectly-4	false	\N	2025-05-16 20:33:18.455217	2025-05-16 20:33:18.41998
2266	30	1	stakeholder-name-5		\N	2025-05-16 20:33:18.456313	2025-05-16 20:33:18.41998
2268	30	1	stakeholder-indirectly-5	false	\N	2025-05-16 20:33:18.458578	2025-05-16 20:33:18.41998
2269	30	1	stakeholder-name-6		\N	2025-05-16 20:33:18.459662	2025-05-16 20:33:18.41998
2270	30	1	stakeholder-directly-6	false	\N	2025-05-16 20:33:18.460847	2025-05-16 20:33:18.41998
2272	30	1	option-title-0	asd	\N	2025-05-16 20:33:18.463035	2025-05-16 20:33:18.41998
2273	30	1	option-description-0	asd	\N	2025-05-16 20:33:18.464141	2025-05-16 20:33:18.41998
2274	30	1	option-title-1		\N	2025-05-16 20:33:18.465287	2025-05-16 20:33:18.41998
2276	30	1	option-title-2		\N	2025-05-16 20:33:18.467553	2025-05-16 20:33:18.41998
2277	30	1	option-description-2		\N	2025-05-16 20:33:18.468721	2025-05-16 20:33:18.41998
2278	30	1	tentative-choice-0	false	\N	2025-05-16 20:33:18.4699	2025-05-16 20:33:18.41998
2280	30	1	tentative-choice-2	false	\N	2025-05-16 20:33:18.472382	2025-05-16 20:33:18.41998
2281	30	1	num_stakeholders	7	\N	2025-05-16 20:33:18.473531	2025-05-16 20:33:18.41998
2283	1	2	stakeholder-directly-0	directly	\N	2025-05-19 21:58:41.795461	2025-05-19 21:58:41.789607
2284	1	2	stakeholder-indirectly-0	false	\N	2025-05-19 21:58:41.79717	2025-05-19 21:58:41.789607
2285	1	2	short-term-0	0	\N	2025-05-19 21:58:41.798406	2025-05-19 21:58:41.789607
2287	1	2	long-term-0	0	\N	2025-05-19 21:58:41.801	2025-05-19 21:58:41.789607
2288	1	2	inverse-long-term-0	5	\N	2025-05-19 21:58:41.803374	2025-05-19 21:58:41.789607
2289	1	2	stakeholder-name-1	Me, an engineer	\N	2025-05-19 21:58:41.804618	2025-05-19 21:58:41.789607
2291	1	2	stakeholder-indirectly-1	false	\N	2025-05-19 21:58:41.807184	2025-05-19 21:58:41.789607
2292	1	2	short-term-1	5	\N	2025-05-19 21:58:41.808437	2025-05-19 21:58:41.789607
2293	1	2	inverse-short-term-1	0	\N	2025-05-19 21:58:41.809563	2025-05-19 21:58:41.789607
2295	1	2	inverse-long-term-1	5	\N	2025-05-19 21:58:41.812079	2025-05-19 21:58:41.789607
2296	1	2	stakeholder-name-2	Other Engineers in my Department	\N	2025-05-19 21:58:41.813253	2025-05-19 21:58:41.789607
2297	1	2	stakeholder-directly-2	directly	\N	2025-05-19 21:58:41.814388	2025-05-19 21:58:41.789607
2299	1	2	short-term-2	4	\N	2025-05-19 21:58:41.817197	2025-05-19 21:58:41.789607
2300	1	2	inverse-short-term-2	1	\N	2025-05-19 21:58:41.818468	2025-05-19 21:58:41.789607
2301	1	2	long-term-2	1	\N	2025-05-19 21:58:41.819625	2025-05-19 21:58:41.789607
2303	1	2	stakeholder-name-3	Aerospace Company	\N	2025-05-19 21:58:41.822547	2025-05-19 21:58:41.789607
2304	1	2	stakeholder-directly-3	directly	\N	2025-05-19 21:58:41.823794	2025-05-19 21:58:41.789607
2305	1	2	stakeholder-indirectly-3	false	\N	2025-05-19 21:58:41.824967	2025-05-19 21:58:41.789607
2307	1	2	inverse-short-term-3	1	\N	2025-05-19 21:58:41.827297	2025-05-19 21:58:41.789607
2308	1	2	long-term-3	1	\N	2025-05-19 21:58:41.82843	2025-05-19 21:58:41.789607
2309	1	2	inverse-long-term-3	4	\N	2025-05-19 21:58:41.82956	2025-05-19 21:58:41.789607
2311	1	2	stakeholder-directly-4	directly	\N	2025-05-19 21:58:41.831999	2025-05-19 21:58:41.789607
2312	1	2	stakeholder-indirectly-4	false	\N	2025-05-19 21:58:41.833166	2025-05-19 21:58:41.789607
2313	1	2	short-term-4	4	\N	2025-05-19 21:58:41.834284	2025-05-19 21:58:41.789607
2315	1	2	long-term-4	1	\N	2025-05-19 21:58:41.836605	2025-05-19 21:58:41.789607
2316	1	2	inverse-long-term-4	4	\N	2025-05-19 21:58:41.837787	2025-05-19 21:58:41.789607
2317	1	2	stakeholder-name-5	Other Workers	\N	2025-05-19 21:58:41.838898	2025-05-19 21:58:41.789607
2319	1	2	stakeholder-indirectly-5	indirectly	\N	2025-05-19 21:58:41.841442	2025-05-19 21:58:41.789607
2320	1	2	short-term-5	3	\N	2025-05-19 21:58:41.842606	2025-05-19 21:58:41.789607
2321	1	2	inverse-short-term-5	2	\N	2025-05-19 21:58:41.843709	2025-05-19 21:58:41.789607
2323	1	2	inverse-long-term-5	3	\N	2025-05-19 21:58:41.84611	2025-05-19 21:58:41.789607
2324	1	2	stakeholder-name-6	Aerospace Industry	\N	2025-05-19 21:58:41.847317	2025-05-19 21:58:41.789607
2325	1	2	stakeholder-directly-6	false	\N	2025-05-19 21:58:41.848445	2025-05-19 21:58:41.789607
2327	1	2	short-term-6	1	\N	2025-05-19 21:58:41.850909	2025-05-19 21:58:41.789607
2328	1	2	inverse-short-term-6	4	\N	2025-05-19 21:58:41.852087	2025-05-19 21:58:41.789607
2329	1	2	long-term-6	1	\N	2025-05-19 21:58:41.853206	2025-05-19 21:58:41.789607
2438	1	11	sexism-0	10	\N	2025-05-19 22:19:41.258467	2025-05-19 22:19:41.246656
2235	29	1	option-description-0		\N	2025-05-16 20:32:57.151769	2025-05-16 20:32:57.0983
2239	29	1	option-description-2		\N	2025-05-16 20:32:57.157012	2025-05-16 20:32:57.0983
2243	29	1	num_stakeholders	7	\N	2025-05-16 20:32:57.162089	2025-05-16 20:32:57.0983
2247	30	1	state-the-problem		\N	2025-05-16 20:33:18.431766	2025-05-16 20:33:18.41998
2251	30	1	stakeholder-name-0		\N	2025-05-16 20:33:18.438528	2025-05-16 20:33:18.41998
2255	30	1	stakeholder-directly-1	false	\N	2025-05-16 20:33:18.443992	2025-05-16 20:33:18.41998
2259	30	1	stakeholder-indirectly-2	false	\N	2025-05-16 20:33:18.448565	2025-05-16 20:33:18.41998
2263	30	1	stakeholder-name-4		\N	2025-05-16 20:33:18.453048	2025-05-16 20:33:18.41998
2267	30	1	stakeholder-directly-5	false	\N	2025-05-16 20:33:18.457445	2025-05-16 20:33:18.41998
2271	30	1	stakeholder-indirectly-6	false	\N	2025-05-16 20:33:18.461939	2025-05-16 20:33:18.41998
2275	30	1	option-description-1		\N	2025-05-16 20:33:18.466448	2025-05-16 20:33:18.41998
2279	30	1	tentative-choice-1	false	\N	2025-05-16 20:33:18.471224	2025-05-16 20:33:18.41998
2282	1	2	stakeholder-name-0	Future Passengers	\N	2025-05-19 21:58:41.793826	2025-05-19 21:58:41.789607
2286	1	2	inverse-short-term-0	5	\N	2025-05-19 21:58:41.799852	2025-05-19 21:58:41.789607
2290	1	2	stakeholder-directly-1	directly	\N	2025-05-19 21:58:41.80599	2025-05-19 21:58:41.789607
2294	1	2	long-term-1	0	\N	2025-05-19 21:58:41.810942	2025-05-19 21:58:41.789607
2298	1	2	stakeholder-indirectly-2	false	\N	2025-05-19 21:58:41.815587	2025-05-19 21:58:41.789607
2302	1	2	inverse-long-term-2	4	\N	2025-05-19 21:58:41.821058	2025-05-19 21:58:41.789607
2306	1	2	short-term-3	4	\N	2025-05-19 21:58:41.826154	2025-05-19 21:58:41.789607
2310	1	2	stakeholder-name-4	Senior Management	\N	2025-05-19 21:58:41.830916	2025-05-19 21:58:41.789607
2314	1	2	inverse-short-term-4	1	\N	2025-05-19 21:58:41.835494	2025-05-19 21:58:41.789607
2318	1	2	stakeholder-directly-5	false	\N	2025-05-19 21:58:41.840095	2025-05-19 21:58:41.789607
2322	1	2	long-term-5	2	\N	2025-05-19 21:58:41.844942	2025-05-19 21:58:41.789607
2326	1	2	stakeholder-indirectly-6	indirectly	\N	2025-05-19 21:58:41.84976	2025-05-19 21:58:41.789607
2330	1	2	inverse-long-term-6	4	\N	2025-05-19 21:58:41.85435	2025-05-19 21:58:41.789607
2334	1	2	ranked-long-term	87.86	\N	2025-05-19 21:58:41.859821	2025-05-19 21:58:41.789607
2338	1	2	cumulative-score	10	\N	2025-05-19 21:58:41.865878	2025-05-19 21:58:41.789607
2389	1	7	slider-1	1	\N	2025-05-19 22:05:57.857518	2025-05-19 22:05:57.850635
2394	1	7	topic-ps-0	Yes, I feel personally responsible for all of these role determined duties.	\N	2025-05-19 22:05:57.864686	2025-05-19 22:05:57.850635
2399	1	8	fidelity-slider-1	8	\N	2025-05-19 22:09:06.110013	2025-05-19 22:09:06.10623
2404	1	8	gratitude-slider-2	7	\N	2025-05-19 22:09:06.118842	2025-05-19 22:09:06.10623
2331	1	2	unranked-short-term	40.00	\N	2025-05-19 21:58:41.85567	2025-05-19 21:58:41.789607
2335	1	2	topic-sa-0	Given that the safety issues could result in passenger death, I say future passengers are the ones with the most at stake. The short term costs, extra time and negative impact on the company are serious, but money ranks lower than immediate life and death. I put myself second because I know that whistleblowers often suffer serious repercussions personally and professionally.	\N	2025-05-19 21:58:41.86099	2025-05-19 21:58:41.789607
2339	1	2	num_stakeholders	7	\N	2025-05-19 21:58:41.867007	2025-05-19 21:58:41.789607
2390	1	7	moral-duty-2	A professional duty to my colleagues and my company	\N	2025-05-19 22:05:57.858978	2025-05-19 22:05:57.850635
2395	1	7	topic-ps-1	In the case, the role determined duties are in conflict so this is highlighting how difficult this situation is for me.	\N	2025-05-19 22:05:57.865982	2025-05-19 22:05:57.850635
2403	1	8	gratitude-slider-1	7	\N	2025-05-19 22:09:06.117295	2025-05-19 22:09:06.10623
2408	1	8	cumulative-score	8	\N	2025-05-19 22:09:06.124304	2025-05-19 22:09:06.10623
2332	1	2	unranked-long-term	82.86	\N	2025-05-19 21:58:41.857337	2025-05-19 21:58:41.789607
2336	1	2	topic-sa-1	I think they are both important in this case because what we do in the short term will have a significant impact on future events. More people will be impacted in the long-term, than in the short-term.	\N	2025-05-19 21:58:41.863423	2025-05-19 21:58:41.789607
2392	1	7	moral-duty-3	A duty to my family as the primary breadwinner	\N	2025-05-19 22:05:57.862195	2025-05-19 22:05:57.850635
2397	1	7	average-sacrifice	1	\N	2025-05-19 22:05:57.868439	2025-05-19 22:05:57.850635
2402	1	8	reparation-slider-2	0	\N	2025-05-19 22:09:06.116014	2025-05-19 22:09:06.10623
2407	1	8	percentage-action-taken	80	\N	2025-05-19 22:09:06.123032	2025-05-19 22:09:06.10623
2333	1	2	ranked-short-term	39.29	\N	2025-05-19 21:58:41.85858	2025-05-19 21:58:41.789607
2337	1	2	topic-sa-2	This makes the decision to blow the whistle very tough. I'm confident that a tragedy will occur, but it is impossible to predict when, and how many people will die. Other engineers may disagree with my analysis, and no technology is 100% safe, so senior management is always calculating risks. I think even one life is worth saving.	\N	2025-05-19 21:58:41.864631	2025-05-19 21:58:41.789607
2388	1	7	moral-duty-1	A duty to protect lives	\N	2025-05-19 22:05:57.85556	2025-05-19 22:05:57.850635
2393	1	7	slider-3	1	\N	2025-05-19 22:05:57.863457	2025-05-19 22:05:57.850635
2398	1	7	cumulative-score	1	\N	2025-05-19 22:05:57.869669	2025-05-19 22:05:57.850635
2401	1	8	reparation-slider-1	0	\N	2025-05-19 22:09:06.113927	2025-05-19 22:09:06.10623
2406	1	8	topic-dva-1	They all seem important.	\N	2025-05-19 22:09:06.121631	2025-05-19 22:09:06.10623
2434	1	11	stakeholder-name-0	Future Passengers	\N	2025-05-19 22:19:41.251125	2025-05-19 22:19:41.246656
2435	1	11	num_stakeholders	7	\N	2025-05-19 22:19:41.253685	2025-05-19 22:19:41.246656
2436	1	11	stakeholder-directly-0	directly	\N	2025-05-19 22:19:41.255579	2025-05-19 22:19:41.246656
2437	1	11	stakeholder-indirectly-0	false	\N	2025-05-19 22:19:41.257069	2025-05-19 22:19:41.246656
2439	1	11	racism-0	10	\N	2025-05-19 22:19:41.259867	2025-05-19 22:19:41.246656
2440	1	11	ableism-0	10	\N	2025-05-19 22:19:41.261165	2025-05-19 22:19:41.246656
2441	1	11	ageism-0	10	\N	2025-05-19 22:19:41.26233	2025-05-19 22:19:41.246656
2442	1	11	stakeholder-name-1	Me, an engineer	\N	2025-05-19 22:19:41.263495	2025-05-19 22:19:41.246656
2444	1	11	stakeholder-indirectly-1	false	\N	2025-05-19 22:19:41.26611	2025-05-19 22:19:41.246656
2445	1	11	sexism-1	5	\N	2025-05-19 22:19:41.26732	2025-05-19 22:19:41.246656
2446	1	11	racism-1	13	\N	2025-05-19 22:19:41.268577	2025-05-19 22:19:41.246656
2447	1	11	ableism-1	13	\N	2025-05-19 22:19:41.269656	2025-05-19 22:19:41.246656
2449	1	11	stakeholder-name-2	Other Engineers in my Department	\N	2025-05-19 22:19:41.272167	2025-05-19 22:19:41.246656
2450	1	11	stakeholder-directly-2	directly	\N	2025-05-19 22:19:41.273354	2025-05-19 22:19:41.246656
2451	1	11	stakeholder-indirectly-2	false	\N	2025-05-19 22:19:41.274683	2025-05-19 22:19:41.246656
2452	1	11	sexism-2	15	\N	2025-05-19 22:19:41.275885	2025-05-19 22:19:41.246656
2454	1	11	ableism-2	15	\N	2025-05-19 22:19:41.278523	2025-05-19 22:19:41.246656
2455	1	11	ageism-2	8	\N	2025-05-19 22:19:41.279635	2025-05-19 22:19:41.246656
2456	1	11	stakeholder-name-3	Aerospace Company	\N	2025-05-19 22:19:41.280697	2025-05-19 22:19:41.246656
2457	1	11	stakeholder-directly-3	directly	\N	2025-05-19 22:19:41.281764	2025-05-19 22:19:41.246656
2459	1	11	sexism-3	10	\N	2025-05-19 22:19:41.284058	2025-05-19 22:19:41.246656
2460	1	11	racism-3	10	\N	2025-05-19 22:19:41.285223	2025-05-19 22:19:41.246656
2461	1	11	ableism-3	10	\N	2025-05-19 22:19:41.2863	2025-05-19 22:19:41.246656
2462	1	11	ageism-3	10	\N	2025-05-19 22:19:41.287446	2025-05-19 22:19:41.246656
2464	1	11	stakeholder-directly-4	directly	\N	2025-05-19 22:19:41.289838	2025-05-19 22:19:41.246656
2465	1	11	stakeholder-indirectly-4	false	\N	2025-05-19 22:19:41.291097	2025-05-19 22:19:41.246656
2466	1	11	sexism-4	18	\N	2025-05-19 22:19:41.29235	2025-05-19 22:19:41.246656
2467	1	11	racism-4	18	\N	2025-05-19 22:19:41.29357	2025-05-19 22:19:41.246656
2469	1	11	ageism-4	18	\N	2025-05-19 22:19:41.295913	2025-05-19 22:19:41.246656
2470	1	11	stakeholder-name-5	Other Workers	\N	2025-05-19 22:19:41.297078	2025-05-19 22:19:41.246656
2471	1	11	stakeholder-directly-5	false	\N	2025-05-19 22:19:41.298175	2025-05-19 22:19:41.246656
2472	1	11	stakeholder-indirectly-5	indirectly	\N	2025-05-19 22:19:41.299351	2025-05-19 22:19:41.246656
2474	1	11	racism-5	10	\N	2025-05-19 22:19:41.301787	2025-05-19 22:19:41.246656
2475	1	11	ableism-5	10	\N	2025-05-19 22:19:41.30341	2025-05-19 22:19:41.246656
2476	1	11	ageism-5	10	\N	2025-05-19 22:19:41.30489	2025-05-19 22:19:41.246656
2477	1	11	stakeholder-name-6	Aerospace Industry	\N	2025-05-19 22:19:41.306121	2025-05-19 22:19:41.246656
2479	1	11	stakeholder-indirectly-6	indirectly	\N	2025-05-19 22:19:41.308888	2025-05-19 22:19:41.246656
2480	1	11	sexism-6	13	\N	2025-05-19 22:19:41.31016	2025-05-19 22:19:41.246656
2481	1	11	racism-6	13	\N	2025-05-19 22:19:41.311415	2025-05-19 22:19:41.246656
2482	1	11	ableism-6	13	\N	2025-05-19 22:19:41.312663	2025-05-19 22:19:41.246656
2484	1	11	topic-if-0	Most of the stakeholder groups are too diverse for this analysis. But our industry is mostly white guys, I'm an older woman so I see some sexism and racism in our industry. Senior Management is almost all young white males and as a result, there are blindspots.	\N	2025-05-19 22:19:41.315042	2025-05-19 22:19:41.246656
2485	1	11	topic-if-1	I don't think this applies very well to this case. I aim to protect any future passenger regardless of their social position.	\N	2025-05-19 22:19:41.316325	2025-05-19 22:19:41.246656
2486	1	11	topic-if-2	I think it's hard for people who enjoy privilege to think about the experience of people who experience oppression. I did notice that most of the planes at risk are fulfilling contracts outside of the US.	\N	2025-05-19 22:19:41.317506	2025-05-19 22:19:41.246656
2487	1	11	cumulative-score	7	\N	2025-05-19 22:19:41.318713	2025-05-19 22:19:41.246656
2488	1	12	slider-0	3	\N	2025-05-19 22:23:45.430444	2025-05-19 22:23:45.426189
2490	1	12	slider-2	5	\N	2025-05-19 22:23:45.433688	2025-05-19 22:23:45.426189
2491	1	12	topic-sg-0	Our industry is not good for the environment so in that way, we are prioritizing humans. We make money off non-renewable resources.	\N	2025-05-19 22:23:45.435029	2025-05-19 22:23:45.426189
2492	1	12	topic-sg-1	That's a complicated question for our industry. We make a contribution to society and connect people who would otherwise be isolated from each other.	\N	2025-05-19 22:23:45.436303	2025-05-19 22:23:45.426189
2493	1	12	topic-sg-2	Future humans will need each other, but they will also need a sustainable natural world. As an industry, we could do better. This plane will be more efficient so I guess it's a step in the right direction, but it's a small step.	\N	2025-05-19 22:23:45.437626	2025-05-19 22:23:45.426189
2495	1	12	cumulative-score	4	\N	2025-05-19 22:23:45.440138	2025-05-19 22:23:45.426189
2497	1	13	vice-1	13	\N	2025-05-19 22:28:15.138143	2025-05-19 22:28:15.132464
2498	1	13	domain-2	Integrity	\N	2025-05-19 22:28:15.139609	2025-05-19 22:28:15.132464
2499	1	13	vice-2	9	\N	2025-05-19 22:28:15.141034	2025-05-19 22:28:15.132464
2500	1	13	domain-3	Loyalty	\N	2025-05-19 22:28:15.14231	2025-05-19 22:28:15.132464
2502	1	13	domain-4	Care for others	\N	2025-05-19 22:28:15.144756	2025-05-19 22:28:15.132464
2503	1	13	vice-4	13	\N	2025-05-19 22:28:15.146159	2025-05-19 22:28:15.132464
2504	1	13	domain-5	Professionalism	\N	2025-05-19 22:28:15.147311	2025-05-19 22:28:15.132464
2505	1	13	vice-5	12	\N	2025-05-19 22:28:15.148681	2025-05-19 22:28:15.132464
2507	1	13	topic-ve-1	I guess it depends on what domains a person chooses.	\N	2025-05-19 22:28:15.151034	2025-05-19 22:28:15.132464
2508	1	13	num-domains	5	\N	2025-05-19 22:28:15.152149	2025-05-19 22:28:15.132464
2509	1	13	vv-average	8	\N	2025-05-19 22:28:15.153262	2025-05-19 22:28:15.132464
2510	1	13	cumulative-score	8	\N	2025-05-19 22:28:15.154679	2025-05-19 22:28:15.132464
2512	1	14	slider-value-1	8	\N	2025-05-19 22:29:45.702361	2025-05-19 22:29:45.693776
2513	1	14	slider-value-2	9	\N	2025-05-19 22:29:45.704633	2025-05-19 22:29:45.693776
2514	1	14	topic-lp-0	According to this, I am on the right path.	\N	2025-05-19 22:29:45.705961	2025-05-19 22:29:45.693776
2515	1	14	topic-lp-1	No, it's not, but in this case I think the choice is becoming clear. I don't think I could live with myself if I don't do what I think is right.	\N	2025-05-19 22:29:45.707158	2025-05-19 22:29:45.693776
2517	1	14	slider-scale-1	Hatred,Loving Kindness	\N	2025-05-19 22:29:45.709549	2025-05-19 22:29:45.693776
2518	1	14	slider-scale-2	Greed,Generosity	\N	2025-05-19 22:29:45.710741	2025-05-19 22:29:45.693776
2519	1	14	num-sliders-lp	3	\N	2025-05-19 22:29:45.712166	2025-05-19 22:29:45.693776
2520	1	14	cumulative-score	NaN	\N	2025-05-19 22:29:45.713515	2025-05-19 22:29:45.693776
2521	1	15	slider-reverence-for-life-value	10	\N	2025-05-19 22:32:52.715917	2025-05-19 22:32:52.710777
2522	1	15	slider-reverence-for-life	0	\N	2025-05-19 22:32:52.717619	2025-05-19 22:32:52.710777
2523	1	15	slider-interdependence-value	7	\N	2025-05-19 22:32:52.719174	2025-05-19 22:32:52.710777
2524	1	15	slider-interdependence	3	\N	2025-05-19 22:32:52.720478	2025-05-19 22:32:52.710777
2526	1	15	slider-society-responsibility	3	\N	2025-05-19 22:32:52.723261	2025-05-19 22:32:52.710777
2527	1	15	slider-global-justice-value	6	\N	2025-05-19 22:32:52.724549	2025-05-19 22:32:52.710777
2528	1	15	slider-global-justice	4	\N	2025-05-19 22:32:52.725853	2025-05-19 22:32:52.710777
2529	1	15	slider-environmental-stewardship-value	4	\N	2025-05-19 22:32:52.726981	2025-05-19 22:32:52.710777
2531	1	15	slider-reverence-for-place-value	5	\N	2025-05-19 22:32:52.729317	2025-05-19 22:32:52.710777
2532	1	15	slider-reverence-for-place	5	\N	2025-05-19 22:32:52.730503	2025-05-19 22:32:52.710777
2533	1	15	topic-up-0	Not all these big picture ideas apply but some of them are relevant and helpful. A good reminder of the big picture. I hadn't consider legal implications but the company could be liable, especially if they deliberately sell more risky technology to poorer nations.	\N	2025-05-19 22:32:52.731659	2025-05-19 22:32:52.710777
2443	1	11	stakeholder-directly-1	directly	\N	2025-05-19 22:19:41.264626	2025-05-19 22:19:41.246656
2448	1	11	ageism-1	5	\N	2025-05-19 22:19:41.27097	2025-05-19 22:19:41.246656
2453	1	11	racism-2	15	\N	2025-05-19 22:19:41.277285	2025-05-19 22:19:41.246656
2458	1	11	stakeholder-indirectly-3	false	\N	2025-05-19 22:19:41.282872	2025-05-19 22:19:41.246656
2463	1	11	stakeholder-name-4	Senior Management	\N	2025-05-19 22:19:41.288636	2025-05-19 22:19:41.246656
2468	1	11	ableism-4	18	\N	2025-05-19 22:19:41.294748	2025-05-19 22:19:41.246656
2473	1	11	sexism-5	10	\N	2025-05-19 22:19:41.300594	2025-05-19 22:19:41.246656
2478	1	11	stakeholder-directly-6	false	\N	2025-05-19 22:19:41.307436	2025-05-19 22:19:41.246656
2483	1	11	ageism-6	13	\N	2025-05-19 22:19:41.31386	2025-05-19 22:19:41.246656
2489	1	12	slider-1	3	\N	2025-05-19 22:23:45.43236	2025-05-19 22:23:45.426189
2494	1	12	num-sliders	3	\N	2025-05-19 22:23:45.438887	2025-05-19 22:23:45.426189
2496	1	13	domain-1	Honesty	\N	2025-05-19 22:28:15.136502	2025-05-19 22:28:15.132464
2501	1	13	vice-3	6	\N	2025-05-19 22:28:15.143617	2025-05-19 22:28:15.132464
2506	1	13	topic-ve-0	Yes, I'm betraying my company and my colleagues, but I believe it's for a good reason.	\N	2025-05-19 22:28:15.149934	2025-05-19 22:28:15.132464
2511	1	14	slider-value-0	7	\N	2025-05-19 22:29:45.698182	2025-05-19 22:29:45.693776
2516	1	14	slider-scale-0	Ignorance,Wisdom	\N	2025-05-19 22:29:45.708342	2025-05-19 22:29:45.693776
2525	1	15	slider-society-responsibility-value	7	\N	2025-05-19 22:32:52.722065	2025-05-19 22:32:52.710777
2530	1	15	slider-environmental-stewardship	6	\N	2025-05-19 22:32:52.728184	2025-05-19 22:32:52.710777
2535	1	15	cumulative-score	3	\N	2025-05-19 22:32:52.734162	2025-05-19 22:32:52.710777
2534	1	15	topic-up-1	These ideas are very broad, and as a result, won't always be helpful.	\N	2025-05-19 22:32:52.732839	2025-05-19 22:32:52.710777
2536	59	1	dilemma-0	8	\N	2025-05-21 20:36:07.66947	2025-05-21 20:36:07.660653
2537	59	1	dilemma-1	false	\N	2025-05-21 20:36:07.674832	2025-05-21 20:36:07.660653
2538	59	1	dilemma-2	false	\N	2025-05-21 20:36:07.676873	2025-05-21 20:36:07.660653
2539	59	1	state-the-problem		\N	2025-05-21 20:36:07.678503	2025-05-21 20:36:07.660653
2540	59	1	gather-facts-1		\N	2025-05-21 20:36:07.680016	2025-05-21 20:36:07.660653
2541	59	1	gather-facts-2		\N	2025-05-21 20:36:07.681612	2025-05-21 20:36:07.660653
2542	59	1	gather-facts-3		\N	2025-05-21 20:36:07.683155	2025-05-21 20:36:07.660653
2543	59	1	stakeholder-name-0		\N	2025-05-21 20:36:07.684668	2025-05-21 20:36:07.660653
2544	59	1	stakeholder-directly-0	false	\N	2025-05-21 20:36:07.686015	2025-05-21 20:36:07.660653
2545	59	1	stakeholder-indirectly-0	false	\N	2025-05-21 20:36:07.687343	2025-05-21 20:36:07.660653
2546	59	1	stakeholder-name-1		\N	2025-05-21 20:36:07.688664	2025-05-21 20:36:07.660653
2547	59	1	stakeholder-directly-1	false	\N	2025-05-21 20:36:07.690006	2025-05-21 20:36:07.660653
2548	59	1	stakeholder-indirectly-1	false	\N	2025-05-21 20:36:07.691313	2025-05-21 20:36:07.660653
2549	59	1	stakeholder-name-2		\N	2025-05-21 20:36:07.692581	2025-05-21 20:36:07.660653
2550	59	1	stakeholder-directly-2	false	\N	2025-05-21 20:36:07.693955	2025-05-21 20:36:07.660653
2551	59	1	stakeholder-indirectly-2	false	\N	2025-05-21 20:36:07.695317	2025-05-21 20:36:07.660653
2552	59	1	stakeholder-name-3		\N	2025-05-21 20:36:07.696701	2025-05-21 20:36:07.660653
2553	59	1	stakeholder-directly-3	false	\N	2025-05-21 20:36:07.698074	2025-05-21 20:36:07.660653
2554	59	1	stakeholder-indirectly-3	false	\N	2025-05-21 20:36:07.699463	2025-05-21 20:36:07.660653
2555	59	1	stakeholder-name-4		\N	2025-05-21 20:36:07.700733	2025-05-21 20:36:07.660653
2556	59	1	stakeholder-directly-4	false	\N	2025-05-21 20:36:07.702067	2025-05-21 20:36:07.660653
2557	59	1	stakeholder-indirectly-4	false	\N	2025-05-21 20:36:07.703373	2025-05-21 20:36:07.660653
2558	59	1	stakeholder-name-5		\N	2025-05-21 20:36:07.704656	2025-05-21 20:36:07.660653
2559	59	1	stakeholder-directly-5	false	\N	2025-05-21 20:36:07.706382	2025-05-21 20:36:07.660653
2560	59	1	stakeholder-indirectly-5	false	\N	2025-05-21 20:36:07.70792	2025-05-21 20:36:07.660653
2561	59	1	stakeholder-name-6		\N	2025-05-21 20:36:07.709311	2025-05-21 20:36:07.660653
2562	59	1	stakeholder-directly-6	false	\N	2025-05-21 20:36:07.710712	2025-05-21 20:36:07.660653
2563	59	1	stakeholder-indirectly-6	false	\N	2025-05-21 20:36:07.712264	2025-05-21 20:36:07.660653
2564	59	1	option-title-0		\N	2025-05-21 20:36:07.713533	2025-05-21 20:36:07.660653
2565	59	1	option-description-0		\N	2025-05-21 20:36:07.714843	2025-05-21 20:36:07.660653
2566	59	1	option-title-1		\N	2025-05-21 20:36:07.716108	2025-05-21 20:36:07.660653
2567	59	1	option-description-1		\N	2025-05-21 20:36:07.717377	2025-05-21 20:36:07.660653
2568	59	1	option-title-2		\N	2025-05-21 20:36:07.718644	2025-05-21 20:36:07.660653
2569	59	1	option-description-2		\N	2025-05-21 20:36:07.719973	2025-05-21 20:36:07.660653
2570	59	1	tentative-choice-0	false	\N	2025-05-21 20:36:07.721221	2025-05-21 20:36:07.660653
2571	59	1	tentative-choice-1	false	\N	2025-05-21 20:36:07.722484	2025-05-21 20:36:07.660653
2572	59	1	tentative-choice-2	false	\N	2025-05-21 20:36:07.723775	2025-05-21 20:36:07.660653
2573	59	1	num_stakeholders	7	\N	2025-05-21 20:36:07.725576	2025-05-21 20:36:07.660653
2574	68	1	dilemma-2	false	\N	2025-05-22 22:11:56.399412	2025-05-22 22:11:56.391326
2575	68	1	dilemma-0	5	\N	2025-05-22 22:11:56.405697	2025-05-22 22:11:56.391326
2576	68	1	dilemma-1	false	\N	2025-05-22 22:11:56.407992	2025-05-22 22:11:56.391326
2577	68	1	state-the-problem		\N	2025-05-22 22:11:56.411186	2025-05-22 22:11:56.391326
2578	68	1	gather-facts-1		\N	2025-05-22 22:11:56.41325	2025-05-22 22:11:56.391326
2579	68	1	gather-facts-2		\N	2025-05-22 22:11:56.414835	2025-05-22 22:11:56.391326
2580	68	1	gather-facts-3		\N	2025-05-22 22:11:56.416057	2025-05-22 22:11:56.391326
2581	68	1	stakeholder-name-0		\N	2025-05-22 22:11:56.417336	2025-05-22 22:11:56.391326
2582	68	1	stakeholder-directly-0	false	\N	2025-05-22 22:11:56.418581	2025-05-22 22:11:56.391326
2583	68	1	stakeholder-indirectly-0	false	\N	2025-05-22 22:11:56.419739	2025-05-22 22:11:56.391326
2584	68	1	stakeholder-name-1		\N	2025-05-22 22:11:56.421041	2025-05-22 22:11:56.391326
2585	68	1	stakeholder-directly-1	false	\N	2025-05-22 22:11:56.422323	2025-05-22 22:11:56.391326
2586	68	1	stakeholder-indirectly-1	false	\N	2025-05-22 22:11:56.423683	2025-05-22 22:11:56.391326
2587	68	1	stakeholder-name-2		\N	2025-05-22 22:11:56.424944	2025-05-22 22:11:56.391326
2588	68	1	stakeholder-directly-2	false	\N	2025-05-22 22:11:56.426226	2025-05-22 22:11:56.391326
2589	68	1	stakeholder-indirectly-2	false	\N	2025-05-22 22:11:56.427558	2025-05-22 22:11:56.391326
2590	68	1	stakeholder-name-3		\N	2025-05-22 22:11:56.428821	2025-05-22 22:11:56.391326
2591	68	1	stakeholder-directly-3	false	\N	2025-05-22 22:11:56.430206	2025-05-22 22:11:56.391326
2592	68	1	stakeholder-indirectly-3	false	\N	2025-05-22 22:11:56.431592	2025-05-22 22:11:56.391326
2593	68	1	stakeholder-name-4		\N	2025-05-22 22:11:56.432858	2025-05-22 22:11:56.391326
2594	68	1	stakeholder-directly-4	false	\N	2025-05-22 22:11:56.434222	2025-05-22 22:11:56.391326
2595	68	1	stakeholder-indirectly-4	false	\N	2025-05-22 22:11:56.435556	2025-05-22 22:11:56.391326
2596	68	1	stakeholder-name-5		\N	2025-05-22 22:11:56.43701	2025-05-22 22:11:56.391326
2597	68	1	stakeholder-directly-5	false	\N	2025-05-22 22:11:56.438282	2025-05-22 22:11:56.391326
2598	68	1	stakeholder-indirectly-5	false	\N	2025-05-22 22:11:56.439541	2025-05-22 22:11:56.391326
2599	68	1	stakeholder-name-6		\N	2025-05-22 22:11:56.440815	2025-05-22 22:11:56.391326
2600	68	1	stakeholder-directly-6	false	\N	2025-05-22 22:11:56.442075	2025-05-22 22:11:56.391326
2601	68	1	stakeholder-indirectly-6	false	\N	2025-05-22 22:11:56.443423	2025-05-22 22:11:56.391326
2602	68	1	option-title-0		\N	2025-05-22 22:11:56.444905	2025-05-22 22:11:56.391326
2603	68	1	option-description-0		\N	2025-05-22 22:11:56.446164	2025-05-22 22:11:56.391326
2604	68	1	option-title-1		\N	2025-05-22 22:11:56.447382	2025-05-22 22:11:56.391326
2605	68	1	option-description-1		\N	2025-05-22 22:11:56.448766	2025-05-22 22:11:56.391326
2606	68	1	option-title-2		\N	2025-05-22 22:11:56.450102	2025-05-22 22:11:56.391326
2607	68	1	option-description-2		\N	2025-05-22 22:11:56.451265	2025-05-22 22:11:56.391326
2608	68	1	tentative-choice-0	false	\N	2025-05-22 22:11:56.452514	2025-05-22 22:11:56.391326
2609	68	1	tentative-choice-1		\N	2025-05-22 22:11:56.453908	2025-05-22 22:11:56.391326
2610	68	1	tentative-choice-2	false	\N	2025-05-22 22:11:56.455037	2025-05-22 22:11:56.391326
2611	68	1	num_stakeholders	7	\N	2025-05-22 22:11:56.456338	2025-05-22 22:11:56.391326
2657	1	1	gather-facts-1	This kind of thing happens all the time in complex systems. That's why we have so many tests. What's unusual in this situation is how far along we are the process. Going forward we will have to think about testing that could be initiated sooner to detect this type of problem. That, I'm sure I could push for, and maybe that's enough?	\N	2025-05-23 19:29:55.452458	2025-05-23 19:29:55.452461
2662	1	1	stakeholder-indirectly-0	false	\N	2025-05-23 19:29:55.459269	2025-05-23 19:29:55.459273
2667	1	1	stakeholder-directly-2	directly	\N	2025-05-23 19:29:55.465744	2025-05-23 19:29:55.465748
2672	1	1	stakeholder-name-4	Senior Management	\N	2025-05-23 19:29:55.472692	2025-05-23 19:29:55.472695
2677	1	1	stakeholder-indirectly-5	indirectly	\N	2025-05-23 19:29:55.479378	2025-05-23 19:29:55.479381
2682	1	1	stakeholder-directly-7	false	\N	2025-05-23 19:29:55.485549	2025-05-23 19:29:55.485552
2687	1	1	option-description-1	I can refuse to sign-off on the system which means my boss would, as he has before, fire me to go ahead. It would ease my professional conscience, but losing my job isn't going to result in a safe product.	\N	2025-05-23 19:29:55.491447	2025-05-23 19:29:55.49145
2692	1	1	tentative-choice-2	Blow the Whistle	\N	2025-05-23 19:29:55.49751	2025-05-23 19:29:55.497514
2712	1	3	pain-1	3	\N	2025-05-23 19:37:53.781654	2025-05-23 19:37:53.781658
2717	1	3	pleasure-3	8	\N	2025-05-23 19:37:53.788016	2025-05-23 19:37:53.788019
2722	1	3	total-pleasure	360	\N	2025-05-23 19:37:53.795711	2025-05-23 19:37:53.795714
2743	1	4	mill-pain-0	1	\N	2025-05-23 19:42:06.866565	2025-05-23 19:42:06.866572
2748	1	4	mill-pleasure-2	9	\N	2025-05-23 19:42:06.872827	2025-05-23 19:42:06.87283
2753	1	4	mill-pain-6	4	\N	2025-05-23 19:42:06.879572	2025-05-23 19:42:06.879576
2758	1	4	mill-pleasure-pain-ratio	88	\N	2025-05-23 19:42:06.885717	2025-05-23 19:42:06.88572
2654	1	1	dilemma-0	17	\N	2025-05-23 19:29:55.443069	2025-05-23 19:29:55.443073
2659	1	1	gather-facts-3	I found out today, but the problem may have been months in the making. Again, I think this has revealed some deficiencies in our testing procedures.	\N	2025-05-23 19:29:55.455655	2025-05-23 19:29:55.455659
2664	1	1	stakeholder-directly-1	directly	\N	2025-05-23 19:29:55.461714	2025-05-23 19:29:55.461717
2669	1	1	stakeholder-name-3	Aerospace Company	\N	2025-05-23 19:29:55.468179	2025-05-23 19:29:55.468182
2674	1	1	stakeholder-indirectly-4	false	\N	2025-05-23 19:29:55.475711	2025-05-23 19:29:55.475715
2679	1	1	stakeholder-directly-6	false	\N	2025-05-23 19:29:55.481747	2025-05-23 19:29:55.48175
2684	1	1	option-title-0	Be loyal to my team	\N	2025-05-23 19:29:55.487912	2025-05-23 19:29:55.487915
2689	1	1	option-description-2	There are two ways I can go outside to stop the project from going head with this bug. I can go to a government regulator, or I can go to the press. It's the only way to ensure safety.	\N	2025-05-23 19:29:55.49385	2025-05-23 19:29:55.493853
2714	1	3	pain-2	9	\N	2025-05-23 19:37:53.784227	2025-05-23 19:37:53.78423
2719	1	3	pain-5	7	\N	2025-05-23 19:37:53.79145	2025-05-23 19:37:53.791453
2724	1	3	pleasure-pain-ratio	86	\N	2025-05-23 19:37:53.798413	2025-05-23 19:37:53.798417
2745	1	4	mill-pain-1	2	\N	2025-05-23 19:42:06.869364	2025-05-23 19:42:06.869368
2750	1	4	mill-pleasure-3	3	\N	2025-05-23 19:42:06.875378	2025-05-23 19:42:06.875381
2755	1	4	topic-uf-0	They are almost the same. I think it's because to me, blowing the whistle seems like the right thing to do. The negatives--financial losses, etc. don't seem important next to death.	\N	2025-05-23 19:42:06.882048	2025-05-23 19:42:06.882052
2655	1	1	dilemma-1	false	\N	2025-05-23 19:29:55.449697	2025-05-23 19:29:55.449701
2660	1	1	stakeholder-name-0	Future Passengers	\N	2025-05-23 19:29:55.456945	2025-05-23 19:29:55.456948
2665	1	1	stakeholder-indirectly-1	false	\N	2025-05-23 19:29:55.463019	2025-05-23 19:29:55.463022
2670	1	1	stakeholder-directly-3	directly	\N	2025-05-23 19:29:55.469519	2025-05-23 19:29:55.469522
2675	1	1	stakeholder-name-5	Other Workers	\N	2025-05-23 19:29:55.477025	2025-05-23 19:29:55.477028
2680	1	1	stakeholder-indirectly-6	indirectly	\N	2025-05-23 19:29:55.483013	2025-05-23 19:29:55.483016
2685	1	1	option-description-0	My boss and many colleagues believe that the risk of this bug resulting in a catastrophic failure is so low that it is not likely to ever happen. I can just go along with them.	\N	2025-05-23 19:29:55.489056	2025-05-23 19:29:55.489059
2690	1	1	tentative-choice-0	false	\N	2025-05-23 19:29:55.495076	2025-05-23 19:29:55.495079
2711	1	3	pleasure-0	9	\N	2025-05-23 19:37:53.780243	2025-05-23 19:37:53.780248
2716	1	3	pain-3	7	\N	2025-05-23 19:37:53.78664	2025-05-23 19:37:53.786644
2721	1	3	pleasure-6	9	\N	2025-05-23 19:37:53.79426	2025-05-23 19:37:53.794263
2744	1	4	mill-pleasure-0	9	\N	2025-05-23 19:42:06.868014	2025-05-23 19:42:06.868018
2749	1	4	mill-pain-3	1	\N	2025-05-23 19:42:06.874128	2025-05-23 19:42:06.874131
2754	1	4	mill-pleasure-6	8	\N	2025-05-23 19:42:06.880823	2025-05-23 19:42:06.880826
2759	1	4	cumulative-score	10	\N	2025-05-23 19:42:06.887053	2025-05-23 19:42:06.887057
2656	1	1	state-the-problem	I am in engineer working on a safety critical project in the aerospace industry. Testing results have revealed a bug that could cause a catastrophic failure during flight which means everyone on that flight will die. However, it is highly unlikely that this bug will be triggered, it could never be triggered. It's impossible to know. On the one hand, I owe it to everyone who relies on our product for safe flights the safest product I can produce; on the other hand, fixing the bug will result in significant financial set backs for me, owning shares means I have a conflict of interest. My professional integrity is in conflict with my financial interests--which could impact my family and everyone that relies on me personally. I have always been loyal to my colleagues and the company, but demanding this bug fix could negatively impact everyone I know and work with, not to mention it could ruin my reputation. If I refuse to sign-off I could lose my job. If word gets out about what I did, it could be hard to find another one in this industry and my skills are not easily transferable.	\N	2025-05-23 19:29:55.451079	2025-05-23 19:29:55.451082
2661	1	1	stakeholder-directly-0	directly	\N	2025-05-23 19:29:55.458109	2025-05-23 19:29:55.458112
2666	1	1	stakeholder-name-2	Other Engineers in my Department	\N	2025-05-23 19:29:55.464344	2025-05-23 19:29:55.464348
2671	1	1	stakeholder-indirectly-3	false	\N	2025-05-23 19:29:55.470715	2025-05-23 19:29:55.470719
2676	1	1	stakeholder-directly-5	false	\N	2025-05-23 19:29:55.478213	2025-05-23 19:29:55.478216
2681	1	1	stakeholder-name-7	Society	\N	2025-05-23 19:29:55.484352	2025-05-23 19:29:55.484356
2686	1	1	option-title-1	Refuse to sign-off	\N	2025-05-23 19:29:55.490222	2025-05-23 19:29:55.490225
2691	1	1	tentative-choice-1	false	\N	2025-05-23 19:29:55.496289	2025-05-23 19:29:55.496292
2710	1	3	pain-0	3	\N	2025-05-23 19:37:53.778847	2025-05-23 19:37:53.778853
2715	1	3	pleasure-2	7	\N	2025-05-23 19:37:53.78541	2025-05-23 19:37:53.785414
2720	1	3	pain-6	2	\N	2025-05-23 19:37:53.792901	2025-05-23 19:37:53.792905
2725	1	3	cumulative-score	10	\N	2025-05-23 19:37:53.799671	2025-05-23 19:37:53.799675
2747	1	4	mill-pain-2	3	\N	2025-05-23 19:42:06.87172	2025-05-23 19:42:06.871723
2752	1	4	mill-pain-5	3	\N	2025-05-23 19:42:06.878274	2025-05-23 19:42:06.878277
2757	1	4	mill-total-pain	40	\N	2025-05-23 19:42:06.884571	2025-05-23 19:42:06.884574
2653	1	1	dilemma-2	false	\N	2025-05-23 19:29:55.441255	2025-05-23 19:29:55.44138
2658	1	1	gather-facts-2	Location unknown. There were several different work groups involved so it would be difficult and time consuming to trace it back. That time would be better spent fixing the bug.	\N	2025-05-23 19:29:55.454446	2025-05-23 19:29:55.45445
2663	1	1	stakeholder-name-1	Me, an engineer	\N	2025-05-23 19:29:55.460481	2025-05-23 19:29:55.460484
2668	1	1	stakeholder-indirectly-2	false	\N	2025-05-23 19:29:55.466962	2025-05-23 19:29:55.466966
2673	1	1	stakeholder-directly-4	directly	\N	2025-05-23 19:29:55.474364	2025-05-23 19:29:55.474367
2678	1	1	stakeholder-name-6	Aerospace Industry	\N	2025-05-23 19:29:55.480525	2025-05-23 19:29:55.480529
2683	1	1	stakeholder-indirectly-7	indirectly	\N	2025-05-23 19:29:55.486769	2025-05-23 19:29:55.486773
2688	1	1	option-title-2	Blow the Whistle	\N	2025-05-23 19:29:55.492591	2025-05-23 19:29:55.492594
2693	1	1	num_stakeholders	8	\N	2025-05-23 19:29:55.498755	2025-05-23 19:29:55.498758
2713	1	3	pleasure-1	7	\N	2025-05-23 19:37:53.782915	2025-05-23 19:37:53.782919
2718	1	3	pleasure-4	9	\N	2025-05-23 19:37:53.789549	2025-05-23 19:37:53.789553
2723	1	3	total-pain	58	\N	2025-05-23 19:37:53.79703	2025-05-23 19:37:53.797034
2746	1	4	mill-pleasure-1	9	\N	2025-05-23 19:42:06.87059	2025-05-23 19:42:06.870593
2751	1	4	mill-pleasure-4	7	\N	2025-05-23 19:42:06.876921	2025-05-23 19:42:06.876924
2756	1	4	mill-total-pleasure	296	\N	2025-05-23 19:42:06.883365	2025-05-23 19:42:06.883368
2760	1	5	moral-virtues	Integrity	\N	2025-05-23 19:44:13.746775	2025-05-23 19:44:13.741931
2761	1	5	primary-virtue-always	Blow the whistle when lives are at stake.	\N	2025-05-23 19:44:13.749847	2025-05-23 19:44:13.741931
2762	1	5	primary-virtue-never	Stay quiet when you can speak up and save lives.	\N	2025-05-23 19:44:13.751406	2025-05-23 19:44:13.741931
2763	1	5	universalizability-pass	pass	\N	2025-05-23 19:44:13.752761	2025-05-23 19:44:13.741931
2764	1	5	universalizability-fail	false	\N	2025-05-23 19:44:13.754037	2025-05-23 19:44:13.741931
2765	1	5	consistency-pass	pass	\N	2025-05-23 19:44:13.755234	2025-05-23 19:44:13.741931
2766	1	5	consistency-fail	false	\N	2025-05-23 19:44:13.756366	2025-05-23 19:44:13.741931
2767	1	5	topic-cq-0		\N	2025-05-23 19:44:13.757639	2025-05-23 19:44:13.741931
2768	1	5	topic-cq-1		\N	2025-05-23 19:44:13.758725	2025-05-23 19:44:13.741931
2769	1	5	topic-cq-2		\N	2025-05-23 19:44:13.759872	2025-05-23 19:44:13.741931
2780	1	6	moral-virtues	Integrity	\N	2025-05-23 19:49:21.141491	2025-05-23 19:49:21.141508
2781	1	6	primary-virtue-always	Blow the whistle when lives are at stake.	\N	2025-05-23 19:49:21.143031	2025-05-23 19:49:21.143035
2782	1	6	primary-virtue-never	Stay quiet when you can speak up and save lives.	\N	2025-05-23 19:49:21.144421	2025-05-23 19:49:21.144425
2783	1	6	universalizability-pass	pass	\N	2025-05-23 19:49:21.1457	2025-05-23 19:49:21.145703
2784	1	6	universalizability-fail	false	\N	2025-05-23 19:49:21.147025	2025-05-23 19:49:21.147029
2785	1	6	consistency-pass	pass	\N	2025-05-23 19:49:21.148285	2025-05-23 19:49:21.148288
2786	1	6	consistency-fail	false	\N	2025-05-23 19:49:21.15571	2025-05-23 19:49:21.155717
2787	1	6	topic-cq-0	Yes, I think that risk of failure resulting in death makes it a situation where it is the right thing to do.	\N	2025-05-23 19:49:21.160577	2025-05-23 19:49:21.160583
2788	1	6	topic-cq-1	Yes and no. On the one hand, it confirms my intuition, that it is the right thing to do. However, because the failure is unlikely, I will never know if I prevented the failure, of if just created a lot of problems for my boss and co-workers over nothing.	\N	2025-05-23 19:49:21.162185	2025-05-23 19:49:21.162189
2789	1	6	topic-cq-2	Yes and no. In situations where there is not doubt about the risks it would, but there are so many situations where the potential risk not certain. It could result in over-cautiousness that stifles innovation.	\N	2025-05-23 19:49:21.163647	2025-05-23 19:49:21.163651
2865	1	10	attentiveness-0	9	\N	2025-05-23 19:55:07.208679	2025-05-23 19:55:07.199102
2866	1	10	competence-0	9	\N	2025-05-23 19:55:07.211096	2025-05-23 19:55:07.199102
2870	1	10	responsiveness-1	9	\N	2025-05-23 19:55:07.216506	2025-05-23 19:55:07.199102
2871	1	10	attentiveness-2	9	\N	2025-05-23 19:55:07.217745	2025-05-23 19:55:07.199102
2875	1	10	competence-3	9	\N	2025-05-23 19:55:07.222437	2025-05-23 19:55:07.199102
2876	1	10	responsiveness-3	3	\N	2025-05-23 19:55:07.223664	2025-05-23 19:55:07.199102
2880	1	10	attentiveness-5	9	\N	2025-05-23 19:55:07.228376	2025-05-23 19:55:07.199102
2881	1	10	competence-5	8	\N	2025-05-23 19:55:07.23016	2025-05-23 19:55:07.199102
2885	1	10	responsiveness-6	7	\N	2025-05-23 19:55:07.235462	2025-05-23 19:55:07.199102
2886	1	10	num_stakeholders	7	\N	2025-05-23 19:55:07.23698	2025-05-23 19:55:07.199102
2890	74	1	dilemma-2	false	\N	2025-05-26 16:29:37.246315	2025-05-26 16:29:37.239375
2892	74	1	gather-facts-1		\N	2025-05-26 16:29:37.249142	2025-05-26 16:29:37.239375
2895	74	1	stakeholder-name-0		\N	2025-05-26 16:29:37.253072	2025-05-26 16:29:37.239375
2897	74	1	stakeholder-indirectly-0	false	\N	2025-05-26 16:29:37.255953	2025-05-26 16:29:37.239375
2900	74	1	stakeholder-indirectly-1	false	\N	2025-05-26 16:29:37.259847	2025-05-26 16:29:37.239375
2902	74	1	stakeholder-directly-2	false	\N	2025-05-26 16:29:37.262273	2025-05-26 16:29:37.239375
2905	74	1	stakeholder-directly-3	false	\N	2025-05-26 16:29:37.26578	2025-05-26 16:29:37.239375
2907	74	1	stakeholder-name-4		\N	2025-05-26 16:29:37.26836	2025-05-26 16:29:37.239375
2910	74	1	stakeholder-name-5		\N	2025-05-26 16:29:37.27286	2025-05-26 16:29:37.239375
2912	74	1	stakeholder-indirectly-5	false	\N	2025-05-26 16:29:37.275749	2025-05-26 16:29:37.239375
2915	74	1	stakeholder-indirectly-6	false	\N	2025-05-26 16:29:37.279683	2025-05-26 16:29:37.239375
2917	74	1	option-description-0		\N	2025-05-26 16:29:37.282405	2025-05-26 16:29:37.239375
2920	74	1	option-title-2		\N	2025-05-26 16:29:37.286947	2025-05-26 16:29:37.239375
2922	74	1	tentative-choice-0	false	\N	2025-05-26 16:29:37.289873	2025-05-26 16:29:37.239375
2925	74	1	num_stakeholders	7	\N	2025-05-26 16:29:37.293616	2025-05-26 16:29:37.239375
2868	1	10	attentiveness-1	9	\N	2025-05-23 19:55:07.214132	2025-05-23 19:55:07.199102
2873	1	10	responsiveness-2	9	\N	2025-05-23 19:55:07.220158	2025-05-23 19:55:07.199102
2878	1	10	competence-4	2	\N	2025-05-23 19:55:07.225946	2025-05-23 19:55:07.199102
2883	1	10	attentiveness-6	6	\N	2025-05-23 19:55:07.232848	2025-05-23 19:55:07.199102
2889	74	1	dilemma-0	false	\N	2025-05-26 16:29:37.244975	2025-05-26 16:29:37.239375
2894	74	1	gather-facts-3		\N	2025-05-26 16:29:37.251677	2025-05-26 16:29:37.239375
2899	74	1	stakeholder-directly-1	false	\N	2025-05-26 16:29:37.258555	2025-05-26 16:29:37.239375
2904	74	1	stakeholder-name-3		\N	2025-05-26 16:29:37.264574	2025-05-26 16:29:37.239375
2909	74	1	stakeholder-indirectly-4	false	\N	2025-05-26 16:29:37.27149	2025-05-26 16:29:37.239375
2914	74	1	stakeholder-directly-6	false	\N	2025-05-26 16:29:37.278402	2025-05-26 16:29:37.239375
2919	74	1	option-description-1		\N	2025-05-26 16:29:37.285514	2025-05-26 16:29:37.239375
2924	74	1	tentative-choice-2	false	\N	2025-05-26 16:29:37.292319	2025-05-26 16:29:37.239375
2968	83	1	gather-facts-1		\N	2025-05-27 22:34:16.414068	2025-05-27 22:34:16.394288
2973	83	1	stakeholder-indirectly-0	false	\N	2025-05-27 22:34:16.42062	2025-05-27 22:34:16.394288
2978	83	1	stakeholder-directly-2	false	\N	2025-05-27 22:34:16.428024	2025-05-27 22:34:16.394288
2983	83	1	stakeholder-name-4		\N	2025-05-27 22:34:16.434324	2025-05-27 22:34:16.394288
2988	83	1	stakeholder-indirectly-5	false	\N	2025-05-27 22:34:16.440224	2025-05-27 22:34:16.394288
2993	83	1	option-description-0		\N	2025-05-27 22:34:16.446011	2025-05-27 22:34:16.394288
2998	83	1	tentative-choice-0	false	\N	2025-05-27 22:34:16.45172	2025-05-27 22:34:16.394288
2867	1	10	responsiveness-0	9	\N	2025-05-23 19:55:07.212729	2025-05-23 19:55:07.199102
2872	1	10	competence-2	8	\N	2025-05-23 19:55:07.21893	2025-05-23 19:55:07.199102
2877	1	10	attentiveness-4	9	\N	2025-05-23 19:55:07.224765	2025-05-23 19:55:07.199102
2882	1	10	responsiveness-5	9	\N	2025-05-23 19:55:07.231529	2025-05-23 19:55:07.199102
2887	1	10	cumulative-score	8	\N	2025-05-23 19:55:07.238486	2025-05-23 19:55:07.199102
2891	74	1	state-the-problem		\N	2025-05-26 16:29:37.24788	2025-05-26 16:29:37.239375
2896	74	1	stakeholder-directly-0	false	\N	2025-05-26 16:29:37.254555	2025-05-26 16:29:37.239375
2901	74	1	stakeholder-name-2		\N	2025-05-26 16:29:37.261086	2025-05-26 16:29:37.239375
2906	74	1	stakeholder-indirectly-3	false	\N	2025-05-26 16:29:37.266955	2025-05-26 16:29:37.239375
2911	74	1	stakeholder-directly-5	false	\N	2025-05-26 16:29:37.274346	2025-05-26 16:29:37.239375
2916	74	1	option-title-0		\N	2025-05-26 16:29:37.281036	2025-05-26 16:29:37.239375
2921	74	1	option-description-2		\N	2025-05-26 16:29:37.28834	2025-05-26 16:29:37.239375
2967	83	1	state-the-problem		\N	2025-05-27 22:34:16.412709	2025-05-27 22:34:16.394288
2972	83	1	stakeholder-directly-0	false	\N	2025-05-27 22:34:16.419318	2025-05-27 22:34:16.394288
2977	83	1	stakeholder-name-2		\N	2025-05-27 22:34:16.426615	2025-05-27 22:34:16.394288
2982	83	1	stakeholder-indirectly-3	false	\N	2025-05-27 22:34:16.43308	2025-05-27 22:34:16.394288
2987	83	1	stakeholder-directly-5	false	\N	2025-05-27 22:34:16.439062	2025-05-27 22:34:16.394288
2992	83	1	option-title-0		\N	2025-05-27 22:34:16.444842	2025-05-27 22:34:16.394288
2997	83	1	option-description-2		\N	2025-05-27 22:34:16.45059	2025-05-27 22:34:16.394288
2869	1	10	competence-1	9	\N	2025-05-23 19:55:07.215314	2025-05-23 19:55:07.199102
2874	1	10	attentiveness-3	6	\N	2025-05-23 19:55:07.221322	2025-05-23 19:55:07.199102
2879	1	10	responsiveness-4	3	\N	2025-05-23 19:55:07.227088	2025-05-23 19:55:07.199102
2884	1	10	competence-6	9	\N	2025-05-23 19:55:07.23412	2025-05-23 19:55:07.199102
2888	74	1	dilemma-1	7	\N	2025-05-26 16:29:37.243254	2025-05-26 16:29:37.239375
2893	74	1	gather-facts-2		\N	2025-05-26 16:29:37.250411	2025-05-26 16:29:37.239375
2898	74	1	stakeholder-name-1		\N	2025-05-26 16:29:37.257302	2025-05-26 16:29:37.239375
2903	74	1	stakeholder-indirectly-2	false	\N	2025-05-26 16:29:37.263413	2025-05-26 16:29:37.239375
2908	74	1	stakeholder-directly-4	false	\N	2025-05-26 16:29:37.27007	2025-05-26 16:29:37.239375
2913	74	1	stakeholder-name-6		\N	2025-05-26 16:29:37.277077	2025-05-26 16:29:37.239375
2918	74	1	option-title-1		\N	2025-05-26 16:29:37.2839	2025-05-26 16:29:37.239375
2923	74	1	tentative-choice-1	false	\N	2025-05-26 16:29:37.291126	2025-05-26 16:29:37.239375
2965	83	1	dilemma-1	false	\N	2025-05-27 22:34:16.409708	2025-05-27 22:34:16.394288
2970	83	1	gather-facts-3		\N	2025-05-27 22:34:16.416619	2025-05-27 22:34:16.394288
2975	83	1	stakeholder-directly-1	false	\N	2025-05-27 22:34:16.423493	2025-05-27 22:34:16.394288
2980	83	1	stakeholder-name-3		\N	2025-05-27 22:34:16.430544	2025-05-27 22:34:16.394288
2985	83	1	stakeholder-indirectly-4	false	\N	2025-05-27 22:34:16.436744	2025-05-27 22:34:16.394288
2990	83	1	stakeholder-directly-6	false	\N	2025-05-27 22:34:16.442545	2025-05-27 22:34:16.394288
2995	83	1	option-description-1		\N	2025-05-27 22:34:16.448277	2025-05-27 22:34:16.394288
3000	83	1	tentative-choice-2	false	\N	2025-05-27 22:34:16.454028	2025-05-27 22:34:16.394288
2964	83	1	dilemma-0	5	\N	2025-05-27 22:34:16.407902	2025-05-27 22:34:16.394288
2969	83	1	gather-facts-2		\N	2025-05-27 22:34:16.415362	2025-05-27 22:34:16.394288
2974	83	1	stakeholder-name-1		\N	2025-05-27 22:34:16.422048	2025-05-27 22:34:16.394288
2979	83	1	stakeholder-indirectly-2	false	\N	2025-05-27 22:34:16.429274	2025-05-27 22:34:16.394288
2984	83	1	stakeholder-directly-4	false	\N	2025-05-27 22:34:16.435542	2025-05-27 22:34:16.394288
2989	83	1	stakeholder-name-6		\N	2025-05-27 22:34:16.441383	2025-05-27 22:34:16.394288
2994	83	1	option-title-1		\N	2025-05-27 22:34:16.447146	2025-05-27 22:34:16.394288
2999	83	1	tentative-choice-1	false	\N	2025-05-27 22:34:16.452916	2025-05-27 22:34:16.394288
2966	83	1	dilemma-2	false	\N	2025-05-27 22:34:16.411328	2025-05-27 22:34:16.394288
2971	83	1	stakeholder-name-0		\N	2025-05-27 22:34:16.418019	2025-05-27 22:34:16.394288
2976	83	1	stakeholder-indirectly-1	false	\N	2025-05-27 22:34:16.424885	2025-05-27 22:34:16.394288
2981	83	1	stakeholder-directly-3	false	\N	2025-05-27 22:34:16.431793	2025-05-27 22:34:16.394288
2986	83	1	stakeholder-name-5		\N	2025-05-27 22:34:16.437952	2025-05-27 22:34:16.394288
2991	83	1	stakeholder-indirectly-6	false	\N	2025-05-27 22:34:16.443679	2025-05-27 22:34:16.394288
2996	83	1	option-title-2		\N	2025-05-27 22:34:16.449455	2025-05-27 22:34:16.394288
3001	83	1	num_stakeholders	7	\N	2025-05-27 22:34:16.455202	2025-05-27 22:34:16.394288
\.


--
-- Data for Name: assignments; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.assignments (assignment_id, student_id, case_study_id, case_study_option_id, submitted, graded, last_modified) FROM stdin;
2	1	7	\N	f	f	2025-05-16 19:03:43.916288
3	1	8	\N	f	f	2025-05-16 19:03:43.916288
4	1	9	\N	f	f	2025-05-16 19:03:43.916288
5	1	10	\N	f	f	2025-05-16 19:03:43.916288
6	1	11	\N	f	f	2025-05-16 19:03:43.916288
7	2	1	\N	f	f	2025-05-16 19:23:18.448306
8	2	2	\N	f	f	2025-05-16 19:23:18.450752
9	2	3	\N	f	f	2025-05-16 19:23:18.452481
10	2	4	\N	f	f	2025-05-16 19:23:18.454094
11	2	5	\N	f	f	2025-05-16 19:23:18.455367
12	3	1	\N	f	f	2025-05-16 19:23:31.810175
13	3	2	\N	f	f	2025-05-16 19:23:31.811442
14	3	3	\N	f	f	2025-05-16 19:23:31.81283
15	3	4	\N	f	f	2025-05-16 19:23:31.814084
16	3	5	\N	f	f	2025-05-16 19:23:31.81531
17	4	1	\N	f	f	2025-05-16 20:12:01.451024
18	4	2	\N	f	f	2025-05-16 20:12:01.452623
20	4	4	\N	f	f	2025-05-16 20:12:01.456132
21	4	5	\N	f	f	2025-05-16 20:12:01.457574
19	4	3	\N	f	f	2025-05-16 20:12:31.292663
22	5	1	\N	f	f	2025-05-16 20:15:06.649239
23	5	2	\N	f	f	2025-05-16 20:15:06.652119
25	5	4	\N	f	f	2025-05-16 20:15:06.654786
26	5	5	\N	f	f	2025-05-16 20:15:06.65602
24	5	3	\N	f	f	2025-05-16 20:15:25.783525
27	6	1	\N	f	f	2025-05-16 20:32:40.826001
28	6	2	\N	f	f	2025-05-16 20:32:40.828891
31	6	5	\N	f	f	2025-05-16 20:32:40.83252
29	6	3	\N	f	f	2025-05-16 20:32:57.0983
30	6	4	\N	f	f	2025-05-16 20:33:18.41998
32	7	1	\N	f	f	2025-05-20 19:40:50.41442
33	7	2	\N	f	f	2025-05-20 19:40:50.416084
34	7	3	\N	f	f	2025-05-20 19:40:50.417644
35	7	4	\N	f	f	2025-05-20 19:40:50.419052
36	7	5	\N	f	f	2025-05-20 19:40:50.420379
37	8	1	\N	f	f	2025-05-20 19:42:10.08983
38	8	2	\N	f	f	2025-05-20 19:42:10.091236
39	8	3	\N	f	f	2025-05-20 19:42:10.092734
40	8	4	\N	f	f	2025-05-20 19:42:10.094034
41	8	5	\N	f	f	2025-05-20 19:42:10.095669
42	9	1	\N	f	f	2025-05-21 17:24:10.410139
43	9	2	\N	f	f	2025-05-21 17:24:10.413111
44	9	3	\N	f	f	2025-05-21 17:24:10.415445
45	9	4	\N	f	f	2025-05-21 17:24:10.417379
46	9	5	\N	f	f	2025-05-21 17:24:10.41909
47	10	1	\N	f	f	2025-05-21 17:35:46.76454
48	10	2	\N	f	f	2025-05-21 17:35:46.766179
49	10	3	\N	f	f	2025-05-21 17:35:46.76758
50	10	4	\N	f	f	2025-05-21 17:35:46.768896
51	10	5	\N	f	f	2025-05-21 17:35:46.770221
52	11	1	\N	f	f	2025-05-21 17:36:58.004736
53	11	2	\N	f	f	2025-05-21 17:36:58.006232
54	11	3	\N	f	f	2025-05-21 17:36:58.007785
55	11	4	\N	f	f	2025-05-21 17:36:58.009096
56	11	5	\N	f	f	2025-05-21 17:36:58.010347
57	12	1	\N	f	f	2025-05-21 20:34:52.178741
58	12	2	\N	f	f	2025-05-21 20:34:52.181581
60	12	4	\N	f	f	2025-05-21 20:34:52.185349
61	12	5	\N	f	f	2025-05-21 20:34:52.186954
59	12	3	\N	f	f	2025-05-21 20:36:07.660653
62	13	1	\N	f	f	2025-05-21 21:29:05.634471
63	13	2	\N	f	f	2025-05-21 21:29:05.638673
64	13	3	\N	f	f	2025-05-21 21:29:05.640948
65	13	4	\N	f	f	2025-05-21 21:29:05.642469
66	13	5	\N	f	f	2025-05-21 21:29:05.643952
67	14	1	\N	f	f	2025-05-22 22:11:17.039284
69	14	3	\N	f	f	2025-05-22 22:11:17.043603
70	14	4	\N	f	f	2025-05-22 22:11:17.044839
71	14	5	\N	f	f	2025-05-22 22:11:17.046019
68	14	2	5	f	f	2025-05-22 22:11:56.391326
1	1	6	17	f	f	2025-05-23 19:55:07.199102
72	15	1	\N	f	f	2025-05-26 16:29:27.347422
73	15	2	\N	f	f	2025-05-26 16:29:27.349401
75	15	4	\N	f	f	2025-05-26 16:29:27.352543
76	15	5	\N	f	f	2025-05-26 16:29:27.353968
74	15	3	7	f	f	2025-05-26 16:29:37.239375
77	16	1	\N	f	f	2025-05-27 22:33:20.04179
78	16	2	\N	f	f	2025-05-27 22:33:20.043593
79	16	3	\N	f	f	2025-05-27 22:33:20.045154
80	16	4	\N	f	f	2025-05-27 22:33:20.046465
81	16	5	\N	f	f	2025-05-27 22:33:20.047675
82	17	1	\N	f	f	2025-05-27 22:33:50.759755
84	17	3	\N	f	f	2025-05-27 22:33:50.76236
85	17	4	\N	f	f	2025-05-27 22:33:50.763637
86	17	5	\N	f	f	2025-05-27 22:33:50.764788
83	17	2	5	f	f	2025-05-27 22:34:16.394288
\.


--
-- Data for Name: case_studies; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.case_studies (case_study_id, prof_id, ta_id, class_id, title, last_modified) FROM stdin;
1	1	\N	1	Guest Assignment 1	2025-05-16
2	1	\N	1	Guest Ethical Dilemma	2025-05-16
3	1	\N	1	Guest Moral Dilemma	2025-05-16
4	1	\N	2	guest class 222 assignment 1	2025-05-16
5	1	\N	2	guest 222 Final Project	2025-05-16
6	2	\N	3	Example 111 Assignment 1	2025-05-16
7	2	\N	3	Example 111 Moral Dilemma	2025-05-16
8	2	\N	3	Example 111 Final Project	2025-05-16
9	2	\N	4	Test 222 Practice Case Study	2025-05-16
10	2	\N	4	Test 222 First Assignment	2025-05-16
11	2	\N	4	222 Project	2025-05-16
\.


--
-- Data for Name: case_study_options; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.case_study_options (case_study_option_id, case_study_id, title, description) FROM stdin;
2	1	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
5	2	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
8	3	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
11	4	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
14	5	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
1	1	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
4	2	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
13	5	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
17	6	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
20	7	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
23	8	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
26	9	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
29	10	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
32	11	Safety Above All	I’ve been an aerospace engineer for over a decade now, and I’ve always prided myself on the work we do. Developing safety-critical systems for aircraft is no small feat, and every day I’m reminded of the weight of the responsibility we carry. Today, though, is different. I sit at my desk, staring at the reports, reviewing the results from our latest software tests. Everything was supposed to be on track—until this.\nIn one corner of the flight control software, a rare condition has cropped up—a bug, an anomaly. It’s the kind of thing you might never encounter during a regular flight, and yet, if it does occur, the consequences could be catastrophic. The numbers flash before me, each scenario playing out in my head. It’s unlikely, yes, but not impossible. Fixing it? That would require a significant rework of the code, delaying our project by months, maybe more. The team’s been working day and night to meet this deadline, and any setback could mean losing contracts, penalties, and much worse for the company.\nThen there’s the matter of my own investments. I’ve got a decent chunk of stock in the company, and I know what a delay would do. We’ve been talking about this upcoming release for months now, and the market’s ready. Any hint of trouble—especially trouble that impacts safety—and the stock will plummet. I’ll feel it, for sure. But maybe more than that, the whole team will feel it. There are jobs, livelihoods, and reputations on the line.\nMy boss is confident we can push forward without making too much noise about this bug. “It’s a minor glitch,” they said. “Not worth derailing the whole project. We’ve seen worse and still delivered.” But the pit in my stomach won’t go away. I’ve been here long enough to know that small glitches don’t always stay small. And while I trust the testing process, there’s always the unpredictable element—the one flight where conditions align just right. Or just wrong.\nI glance at the clock. The decision needs to be made soon, and I’m not sure how much longer I can sit here wrestling with it. I think about the passengers—those I’ll never meet—who rely on this system. I imagine them boarding the aircraft, smiling at the flight attendants, completely unaware of the systems operating behind the scenes, systems I had a hand in certifying. I imagine what it would be like to see something go wrong, to know that I had a choice, but chose not to act.\nAnd yet, the consequences of stopping everything seem equally daunting. The board won’t be happy, the investors will surely react, and we’ll be back at square one, delaying all the progress we’ve made. There’s a lot on the line, and everyone is expecting a green light.\nI sit there, staring at the reports, the weight of the decision growing heavier by the second.\n\nSafety Critical Cases:  \nJohn Sterman and James Quinn,“Boeing’s 737 MAX 8 Disasters.” (2023) MIT Management Sloan School. https://mitsloan.mit.edu/sites/default/files/2023-07/Boeing%27s%20737%20MAX%208%20Disasters.IC__0.pdf \nRichard Witkin, “Engineer’s Warning on DC‐10 Reportedly Never Sent.” (1975) New York Times. https://www.nytimes.com/1975/03/12/archives/engineers-warning-on-dc10-reportedly-never-sent.html \n
3	1	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
12	4	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
15	5	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
18	6	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
21	7	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
24	8	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
27	9	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
30	10	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
33	11	Enter the details of your hard case and/or difficult decision here	Enter details - 700 words max
16	6	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. 
19	7	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. 
22	8	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. 
25	9	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. 
28	10	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. 
31	11	Doing Wrong to do Right	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. 
6	2	Enter the details of your hard case and/or difficult decision here	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
7	3	Safety Above All	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
9	3	Enter the details of your hard case and/or difficult decision here	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
10	4	Safety Above All	The glow of the screen was the only light in the room as I sat frozen, staring at the code I’d just executed. What started as a mission of justice had quickly spiraled into something I never saw coming. I’d spent years honing my skills as a hacker, but I never thought they would lead me here—at the center of chaos I had inadvertently caused. \nI’ve always believed in the idea of hacktivism: using technology to expose corruption, to fight back against injustice in a world that seemed to keep the truth buried beneath layers of deception. So when I discovered a vulnerability in the government’s database that housed financial records, and saw evidence of a high-ranking official siphoning public funds into private accounts, I didn’t hesitate. This wasn’t about me; it was about the people—those who deserved to know that the money meant for schools and hospitals was lining the pockets of the rich.\nI released the data. Anonymous, encrypted, untraceable. It felt like a victory at first. The truth was out. The public could finally see the reality behind the headlines. The story went viral faster than I could have imagined, and for a brief moment, I thought I’d done something good. But that moment passed quickly. \nWithin days, protests exploded in the streets. The government retaliated with force, and before long, the situation turned deadly. People were being beaten, arrested, and some killed in clashes with the authorities. The official I’d exposed resigned, but not before blaming political rivals for the hack. The government then cracked down hard—not just on the protesters, but on anyone they deemed a threat. They began arresting journalists, shutting down websites, and implementing draconian internet restrictions. What had started as a strike against corruption had ignited something far more destructive. I never intended this.\nMy phone buzzes again, another news alert flashing across the screen. I scroll through the headlines, more stories of the unrest I helped spark. In one of my online forums, people are talking about it. Some are calling the hack an act of heroism, but others are condemning it for the chaos it’s caused. They don’t know it was me. They couldn’t. I’ve covered my tracks too well. But that anonymity feels hollow now, like I’m hiding behind it.\nShould I come forward and take responsibility? Own up to what I did, explain that I never intended for people to get hurt? The idea terrifies me. If I step into the light, I could lose everything. I could be arrested, charged with cybercrimes, and who knows what else. My life would be over. But staying silent feels just as wrong. People are paying the price for my actions, and I’m sitting here in the shadows, watching it unfold.\nBut what good would it do to speak up now? The damage is already done. Coming forward won’t change what’s happened. If anything, it could make things worse. The government might use me as a scapegoat, twisting the narrative to justify even harsher crackdowns. And what if the public turns on me, blaming me for the violence and unrest?\nI put my head in my hands, feeling the crushing weight of it all. If I stay quiet, maybe I can still do some good from behind the scenes, try to undo the worst of it. But if I come forward… maybe I can find some sort of redemption. Or maybe, I’ll just make everything worse.\nEither way, I don’t know which path I can live with. Time’s running out.\n\nHacktivism Cases:\nAdrian Horton, “Inside the rise and fall of Ashley Madison: ‘People literally lost their lives.’” (2024) The Guardian.\nhttps://www.theguardian.com/tv-and-radio/article/2024/may/14/ashley-madison-netflix-documentary \nKim Masters, “’Anonymous’ Wages Attack on Scientologists.” (2008) NPR.  https://www.npr.org/2008/02/07/18764756/anonymous-wages-attack-on-scientologists \n
\.


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.classes (class_id, class_name, prof_id, class_code) FROM stdin;
1	guest class 111	1	guest111
2	guest class 222	1	guest222
3	Example 111	2	example111
4	Test 222	2	Test 222
\.


--
-- Data for Name: dynamic_questions; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.dynamic_questions (dynamic_question_id, case_study_id, form_id, question_text) FROM stdin;
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.enrollments (enrollment_id, class_id, student_id) FROM stdin;
1	3	1
2	4	1
3	1	2
4	2	2
5	1	3
6	2	3
7	1	4
8	2	4
9	1	5
10	2	5
11	1	6
12	2	6
13	1	7
14	2	7
15	1	8
16	2	8
17	1	9
18	2	9
19	1	10
20	2	10
21	1	11
22	2	11
23	1	12
24	2	12
25	1	13
26	2	13
27	1	14
28	2	14
29	1	15
30	2	15
31	1	16
32	2	16
33	1	17
34	2	17
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.feedbacks (feedback_id, assignment_id, answer_id, form_id, section_key, content, last_modified) FROM stdin;
\.


--
-- Data for Name: form_descriptions; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.form_descriptions (form_description_id, case_study_id, form_id, description) FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.forms (form_id, name) FROM stdin;
1	dilemma
2	cons-stakeholders
3	cons-util-bentham
4	cons-util-mill
5	categorical-imperatives
6	critical-questions
7	personal-sacrifices
8	duties-versus-actions
9	final-questions
10	care-form
11	intersect-form
12	generations-form
13	virtue-ethics
14	life-path
15	universal-principles
\.


--
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.grades (grade_id, grade, form_group, assignment_id) FROM stdin;
\.


--
-- Data for Name: professors; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.professors (prof_id, name, email, password) FROM stdin;
1	guest professor	guestprofessoremail@testmail.com	$2a$12$2ENfWLUOCsfG9wU5FxLe5O7X/NiPdxgKEb4DnCAdY5JAy.Z1CN51O
2	Example Professor	exampleprofessor@mail.com	$2a$12$2ENfWLUOCsfG9wU5FxLe5O7X/NiPdxgKEb4DnCAdY5JAy.Z1CN51O
\.


--
-- Data for Name: slider_questions; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.slider_questions (slider_question_id, case_study_id, form_id, question_text, left_label, right_label) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.students (student_id, name, email, password, guest, consented, deleted) FROM stdin;
1	Ruth Test	ruthtest@mail.com	$2a$12$2ENfWLUOCsfG9wU5FxLe5O7X/NiPdxgKEb4DnCAdY5JAy.Z1CN51O	f	f	f
2	guest	guestuser564417338@testmail.com	$2b$12$Tka828P335nm.hac3uJa.eeXNezcqa/WX5Qh7bWL2C.c01OTRcpT.	t	f	f
3	guest	guestuser914118748@testmail.com	$2b$12$kQhpriKXN4nDa8DOM5nH9.LOPBCR9VpSTgTw2lOMWa9z5Ss/zwNSS	t	f	f
4	guest	guestuser810696363@testmail.com	$2b$12$OOafVuXR.qFUXzXkbpdNLeFBw5zHaWxIbYwzh8GqrcXjWy5yg0J7m	t	f	f
5	guest	guestuser163547146@testmail.com	$2b$12$qcp8mGLwh6qZsiif3go43.IwRiL3BKqAakpnPyjxS4ldSCNJnbsja	t	f	f
6	guest	guestuser722156384@testmail.com	$2b$12$A71RO7IWLjuFlteqnMABDe09dtxzDjLvBPcFqckyPY9TMEHoVhE3G	t	f	f
7	guest	guestuser1598086618@testmail.com	$2b$12$QYkPlDcQ7/k7P00q7KGaY.iSdi.upPdlBNV2w03thPyTvkt39auOe	t	f	f
8	guest	guestuser1446781073@testmail.com	$2b$12$1ei.ZVdrC/LhVJ7hvuB2RuvRHkw8DXh2BEbJyQVCFqcEwcHjSnFT2	t	f	f
9	guest	guestuser1288074549@testmail.com	$2b$12$saqGbN/SNQzOjgcYATFMIuiXJ4FqQegKG93o6AUF.trMgoknGUgpa	t	f	f
10	guest	guestuser1851682244@testmail.com	$2b$12$j8/LTRMgulT/YVGkWRLVUOl7D8kp6pbNLctFjaHCvf8TlVUro33MW	t	f	f
11	guest	guestuser699005179@testmail.com	$2b$12$Kw1V3NAwk.Vh8gNnqtVCFulQsQVZMKkR8WZ0NVG0VSZGaKmshsUjK	t	f	f
12	guest	guestuser320301335@testmail.com	$2b$12$vBaxuq8MHeKQiv3swNLVYO/xVhMuntAjOsehay7whio5qOBRGSX8C	t	f	f
13	guest	guestuser1008764737@testmail.com	$2b$12$X.bMkMIGJTPo5NoNn98nH.9QzWBT9TwHIVkqRJCTFLJlzZavOjG1C	t	f	f
14	guest	guestuser884101095@testmail.com	$2b$12$NrADOfRD8mYqvA5fvIz/aOLSuQOn/7FgWSrGyKPittbSaahr86Wf.	t	f	f
15	guest	guestuser1865233900@testmail.com	$2b$12$Xso9QDtgTw3oxicAu8rySOzKcFPEUjLwcpRDvpRjfcfuc6lUV/NRy	t	f	f
16	guest	guestuser980064286@testmail.com	$2b$12$F1q.IGcRcx1ubk6PcDk97OU/pjnyGu2Jt2Ee/BZA8X11pt0yg3iPS	t	f	f
17	guest	guestuser83098456@testmail.com	$2b$12$hTDWEHjvFhdftL.4gPQQd.KNHEZBAmcQjr55INofvsbvtTKElUKLG	t	f	f
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.submissions (submission_id, assignment_id, student_id, form_id, submitted_time) FROM stdin;
1	10	2	1	2025-05-16 19:23:18.89261
2	9	2	1	2025-05-16 19:23:18.896658
3	15	3	1	2025-05-16 19:23:32.277047
4	14	3	1	2025-05-16 19:23:32.279891
5	20	4	1	2025-05-16 20:12:01.902942
6	19	4	1	2025-05-16 20:12:01.906281
7	25	5	1	2025-05-16 20:15:07.1051
8	24	5	1	2025-05-16 20:15:07.109323
9	1	1	1	2025-05-23 19:29:55.373593
10	1	1	3	2025-05-23 19:37:53.765321
11	1	1	4	2025-05-23 19:42:06.850494
12	1	1	6	2025-05-23 19:49:21.127676
13	1	1	10	2025-05-23 19:54:04.871614
\.


--
-- Data for Name: tas; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.tas (ta_id, name, email, password) FROM stdin;
\.


--
-- Name: answers_answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.answers_answer_id_seq', 3001, true);


--
-- Name: assignments_assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.assignments_assignment_id_seq', 86, true);


--
-- Name: case_studies_case_study_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.case_studies_case_study_id_seq', 11, true);


--
-- Name: case_study_options_case_study_option_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.case_study_options_case_study_option_id_seq', 33, true);


--
-- Name: classes_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.classes_class_id_seq', 4, true);


--
-- Name: dynamic_questions_dynamic_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.dynamic_questions_dynamic_question_id_seq', 1, false);


--
-- Name: enrollments_enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.enrollments_enrollment_id_seq', 34, true);


--
-- Name: feedbacks_feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.feedbacks_feedback_id_seq', 1, false);


--
-- Name: form_descriptions_form_description_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.form_descriptions_form_description_id_seq', 1, false);


--
-- Name: forms_form_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.forms_form_id_seq', 15, true);


--
-- Name: grades_grade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.grades_grade_id_seq', 1, false);


--
-- Name: professors_prof_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.professors_prof_id_seq', 2, true);


--
-- Name: slider_questions_slider_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.slider_questions_slider_question_id_seq', 1, false);


--
-- Name: students_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.students_student_id_seq', 17, true);


--
-- Name: submissions_submission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.submissions_submission_id_seq', 13, true);


--
-- Name: tas_ta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.tas_ta_id_seq', 1, false);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (answer_id);


--
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (assignment_id);


--
-- Name: case_studies case_studies_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_pkey PRIMARY KEY (case_study_id);


--
-- Name: case_study_options case_study_options_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_study_options
    ADD CONSTRAINT case_study_options_pkey PRIMARY KEY (case_study_option_id);


--
-- Name: classes classes_class_code_key; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_class_code_key UNIQUE (class_code);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (class_id);


--
-- Name: dynamic_questions dynamic_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.dynamic_questions
    ADD CONSTRAINT dynamic_questions_pkey PRIMARY KEY (dynamic_question_id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (enrollment_id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (feedback_id);


--
-- Name: form_descriptions form_descriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.form_descriptions
    ADD CONSTRAINT form_descriptions_pkey PRIMARY KEY (form_description_id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (form_id);


--
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);


--
-- Name: professors professors_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.professors
    ADD CONSTRAINT professors_pkey PRIMARY KEY (prof_id);


--
-- Name: slider_questions slider_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.slider_questions
    ADD CONSTRAINT slider_questions_pkey PRIMARY KEY (slider_question_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (submission_id);


--
-- Name: tas tas_pkey; Type: CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.tas
    ADD CONSTRAINT tas_pkey PRIMARY KEY (ta_id);


--
-- Name: answers answers_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(assignment_id) ON DELETE CASCADE;


--
-- Name: answers answers_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(form_id);


--
-- Name: assignments assignments_case_study_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_case_study_id_fkey FOREIGN KEY (case_study_id) REFERENCES public.case_studies(case_study_id);


--
-- Name: assignments assignments_case_study_option_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_case_study_option_id_fkey FOREIGN KEY (case_study_option_id) REFERENCES public.case_study_options(case_study_option_id);


--
-- Name: assignments assignments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;


--
-- Name: case_studies case_studies_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(class_id);


--
-- Name: case_studies case_studies_prof_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_prof_id_fkey FOREIGN KEY (prof_id) REFERENCES public.professors(prof_id);


--
-- Name: case_studies case_studies_ta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_ta_id_fkey FOREIGN KEY (ta_id) REFERENCES public.tas(ta_id);


--
-- Name: case_study_options case_study_options_case_study_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.case_study_options
    ADD CONSTRAINT case_study_options_case_study_id_fkey FOREIGN KEY (case_study_id) REFERENCES public.case_studies(case_study_id);


--
-- Name: classes classes_prof_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_prof_id_fkey FOREIGN KEY (prof_id) REFERENCES public.professors(prof_id);


--
-- Name: dynamic_questions dynamic_questions_case_study_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.dynamic_questions
    ADD CONSTRAINT dynamic_questions_case_study_id_fkey FOREIGN KEY (case_study_id) REFERENCES public.case_studies(case_study_id);


--
-- Name: dynamic_questions dynamic_questions_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.dynamic_questions
    ADD CONSTRAINT dynamic_questions_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(form_id);


--
-- Name: enrollments enrollments_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(class_id);


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;


--
-- Name: feedbacks feedbacks_answer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES public.answers(answer_id);


--
-- Name: feedbacks feedbacks_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(assignment_id) ON DELETE CASCADE;


--
-- Name: feedbacks feedbacks_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(form_id);


--
-- Name: form_descriptions form_descriptions_case_study_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.form_descriptions
    ADD CONSTRAINT form_descriptions_case_study_id_fkey FOREIGN KEY (case_study_id) REFERENCES public.case_studies(case_study_id);


--
-- Name: form_descriptions form_descriptions_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.form_descriptions
    ADD CONSTRAINT form_descriptions_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(form_id);


--
-- Name: grades grades_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(assignment_id);


--
-- Name: slider_questions slider_questions_case_study_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.slider_questions
    ADD CONSTRAINT slider_questions_case_study_id_fkey FOREIGN KEY (case_study_id) REFERENCES public.case_studies(case_study_id);


--
-- Name: slider_questions slider_questions_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.slider_questions
    ADD CONSTRAINT slider_questions_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(form_id);


--
-- Name: submissions submissions_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(assignment_id) ON DELETE CASCADE;


--
-- Name: submissions submissions_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(form_id);


--
-- Name: submissions submissions_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ethics_dashboard
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.21 (Debian 13.21-1.pgdg120+1)
-- Dumped by pg_dump version 13.21 (Debian 13.21-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: ethics_dashboard
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO ethics_dashboard;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: ethics_dashboard
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

