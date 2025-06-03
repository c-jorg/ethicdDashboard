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
3147	1	5	moral-virtues	Integrity	\N	2025-05-28 18:01:19.78722	2025-05-28 18:01:19.778698
3152	1	5	consistency-pass	false	\N	2025-05-28 18:01:19.798681	2025-05-28 18:01:19.778698
3148	1	5	primary-virtue-always	Blow the whistle on wrongdoing	\N	2025-05-28 18:01:19.78957	2025-05-28 18:01:19.778698
3153	1	5	consistency-fail	fail	\N	2025-05-28 18:01:19.800126	2025-05-28 18:01:19.778698
3149	1	5	primary-virtue-never	Stay quiet about wrongdoing	\N	2025-05-28 18:01:19.792384	2025-05-28 18:01:19.778698
3150	1	5	universalizability-pass	false	\N	2025-05-28 18:01:19.795029	2025-05-28 18:01:19.778698
3151	1	5	universalizability-fail	fail	\N	2025-05-28 18:01:19.79714	2025-05-28 18:01:19.778698
2391	1	7	slider-2	1	\N	2025-05-19 22:05:57.860474	2025-05-19 22:05:57.850635
2396	1	7	num-sacrifices	3	\N	2025-05-19 22:05:57.867154	2025-05-19 22:05:57.850635
2400	1	8	fidelity-slider-2	5	\N	2025-05-19 22:09:06.111758	2025-05-19 22:09:06.10623
2405	1	8	topic-dva-0	I think so, promises are hard because there is a conflict. I make a promise to people who fly in our planes-I will put your safety first; but I also make a promise to my company-I won't reveal secrets.	\N	2025-05-19 22:09:06.120309	2025-05-19 22:09:06.10623
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
2868	1	10	attentiveness-1	9	\N	2025-05-23 19:55:07.214132	2025-05-23 19:55:07.199102
2873	1	10	responsiveness-2	9	\N	2025-05-23 19:55:07.220158	2025-05-23 19:55:07.199102
2878	1	10	competence-4	2	\N	2025-05-23 19:55:07.225946	2025-05-23 19:55:07.199102
2883	1	10	attentiveness-6	6	\N	2025-05-23 19:55:07.232848	2025-05-23 19:55:07.199102
2867	1	10	responsiveness-0	9	\N	2025-05-23 19:55:07.212729	2025-05-23 19:55:07.199102
2872	1	10	competence-2	8	\N	2025-05-23 19:55:07.21893	2025-05-23 19:55:07.199102
2877	1	10	attentiveness-4	9	\N	2025-05-23 19:55:07.224765	2025-05-23 19:55:07.199102
2882	1	10	responsiveness-5	9	\N	2025-05-23 19:55:07.231529	2025-05-23 19:55:07.199102
2887	1	10	cumulative-score	8	\N	2025-05-23 19:55:07.238486	2025-05-23 19:55:07.199102
2869	1	10	competence-1	9	\N	2025-05-23 19:55:07.215314	2025-05-23 19:55:07.199102
2874	1	10	attentiveness-3	6	\N	2025-05-23 19:55:07.221322	2025-05-23 19:55:07.199102
2879	1	10	responsiveness-4	3	\N	2025-05-23 19:55:07.227088	2025-05-23 19:55:07.199102
2884	1	10	competence-6	9	\N	2025-05-23 19:55:07.23412	2025-05-23 19:55:07.199102
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
1	1	6	17	f	f	2025-05-28 18:01:19.778698
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
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: ethics_dashboard
--

COPY public.submissions (submission_id, assignment_id, student_id, form_id, submitted_time) FROM stdin;
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

SELECT pg_catalog.setval('public.answers_answer_id_seq', 3194, true);


--
-- Name: assignments_assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ethics_dashboard
--

SELECT pg_catalog.setval('public.assignments_assignment_id_seq', 111, true);


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

SELECT pg_catalog.setval('public.enrollments_enrollment_id_seq', 44, true);


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

SELECT pg_catalog.setval('public.students_student_id_seq', 22, true);


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

