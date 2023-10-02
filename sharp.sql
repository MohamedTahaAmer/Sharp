--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- Name: Billboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Billboard" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "storeId" uuid NOT NULL,
    label text NOT NULL,
    "imageUrl" text[],
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Billboard" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "storeId" uuid NOT NULL,
    "billboardId" uuid NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Color" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "storeId" uuid NOT NULL,
    name text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Color" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "storeId" uuid NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    phone text DEFAULT ''::text NOT NULL,
    address text DEFAULT ''::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "orderId" uuid NOT NULL,
    "productId" uuid NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "storeId" uuid NOT NULL,
    "categoryId" uuid NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "isArchived" boolean DEFAULT false NOT NULL,
    "sizeId" uuid NOT NULL,
    "colorId" uuid NOT NULL,
    "imageUrls" text[],
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Size" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "storeId" uuid NOT NULL,
    name text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Size" OWNER TO postgres;

--
-- Name: Store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Store" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Store" OWNER TO postgres;

--
-- Name: Test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Test" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public."Test" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    email text,
    username text,
    image text,
    "emailVerified" timestamp(3) without time zone,
    "joinedAt" timestamp(3) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
45aba081-dcce-454a-adea-5666e1573077	6b1a6846-47a3-4cf2-b897-ef071f6dc483	oauth	google	105852631277803676965	\N	ya29.a0AfB_byCecBUEYj2Dfa1xVTYB_MBr7GuBXO0WgntVQFzzgJks8Q3NYv0nnLjfd9ewqFfHVJksHQncRpppvEY5HIuAi934CBqqmecBISdeQj_FdsT44kVWXxIvAbaBH65_SpPvLufnttOUKWOj9BE7wAnmHooc4pjpKQaCgYKAZoSARISFQGOcNnCgClbk0Kqbt7XMouAXnLT7A0169	1694826130	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzE2NjMyMzUzMjMtdWhpc3A3ZnBqYzVrNWdqMzczYTM0cTBoNzczanV2MTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzE2NjMyMzUzMjMtdWhpc3A3ZnBqYzVrNWdqMzczYTM0cTBoNzczanV2MTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU4NTI2MzEyNzc4MDM2NzY5NjUiLCJlbWFpbCI6InRobTc3MjIxMTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJKVUhlNDRqc3hQU0FBaWd1aDBPMUVBIiwibmFtZSI6Im8gbW9oYW1lZCB0YWhhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0t4cXNDNV9xa1hRVlQ3VnhPbTJxYlpTcExJbHRxY1dNYzFMMzhlcTlOZT1zOTYtYyIsImdpdmVuX25hbWUiOiJvIG1vaGFtZWQiLCJmYW1pbHlfbmFtZSI6InRhaGEiLCJsb2NhbGUiOiJhciIsImlhdCI6MTY5NDgyMjUzMSwiZXhwIjoxNjk0ODI2MTMxfQ.LDeOE8qbp6BSKDcsVx5yvnzC2Kpj9QINfkdRKPupMTJT5odey6bNiUyiP9W2P-2_7sFH14_5u5lf1Qi2jcPpxqUfXSvsDSgvM_T91PO_4Ua8OJARtz1CHbLfoIfLMzbgAlNaG6xFju6YxPKa96ExesZGgb2DZxECfTvBB7NPD4pO-Kf1T0I1rT2MDFcgIheb7ADkvw6MmRErEb4kkpEOcLo_fW5_UKH78swRn3jDHapqj97Bl6hajBD6k-ulaMVpWKh-aEQ2JFnvoGp0ywbJmxrJmSP0yGLmDx8Rk4S7nNMDA_UWDZwtg8AEQ3YH-pHWYgnnU9GxtbIRHK-BVnfq9g	\N
f39c2784-0238-4d29-9eca-6244ade5e387	309a6ff7-e538-4843-bb7b-dfc1a6643261	oauth	google	110234024621425364484	\N	ya29.a0AfB_byBsc8Tll3oiuArKKAQ7tySkTXF-_dhAkeIo-dk8Bgz-hVVOTE8JT5xUiECIWYSRg_18wofiRPCZXiN0LshRa577pG--QfLmzcYwir4SuH_4aSawPMljJo5cQjswvkQWFnxEktHYyccTjnBoOoySBxt0RvpHV56OaCgYKAY4SARMSFQGOcNnCYFnZF3AWw4IfQGoutuxjIg0171	1696198694	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6ImI5YWM2MDFkMTMxZmQ0ZmZkNTU2ZmYwMzJhYWIxODg4ODBjZGUzYjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzE2NjMyMzUzMjMtdWhpc3A3ZnBqYzVrNWdqMzczYTM0cTBoNzczanV2MTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzE2NjMyMzUzMjMtdWhpc3A3ZnBqYzVrNWdqMzczYTM0cTBoNzczanV2MTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAyMzQwMjQ2MjE0MjUzNjQ0ODQiLCJlbWFpbCI6Im1vaGFtZWR0YWhhYWFtZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI4bkhHanN2RmNPc1BJZjlhU1Jwb2JBIiwibmFtZSI6Ik1vaGFtZWQgQW1lciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMaVE1M2h0N2dTMWJyOUNXSUxqbW42ZklmdEJDRUJxaUpoQ3pOR08zNzlOUT1zOTYtYyIsImdpdmVuX25hbWUiOiJNb2hhbWVkIiwiZmFtaWx5X25hbWUiOiJBbWVyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTYxOTUwNzcsImV4cCI6MTY5NjE5ODY3N30.ZZybvFFsXJwxjlem4dgdBDLpq_VwS-pW8IFWz4LKDs5hLvvnB2yfY83ASuegr9-om4jBXp9jwfSfnvUYJmRIVdt7oSiaGh96-Fb1NMtg0rTGgV7xpUYcKRu9O9GkOoSs5PlsnZJeGdfVhzWHzAJlOqosTdA1O77BbHFQqXkoINWypitlL3cLoXiGUX0jU-QbLchKw5Lq8vnm7ASbSfXRtkS6oXXlNOobOUSx3NcBRbjcs62f18usxu6FN-zRgMIYxHg2_RCr0uxwiEFsjtxLGq5OHKKn1-guFmFZeYBhILu0BnZQ-n8gHmkONAQw8ZIVZugX6Y0OLm3KPDW_63Nf6w	\N
\.


--
-- Data for Name: Billboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Billboard" (id, "storeId", label, "imageUrl", "createdAt", "updatedAt") FROM stdin;
4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36	573ae13b-576a-48e4-9a04-d8d029024ac6	Suits	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915206/xvvt8pboa9kaibxzc3ql.jpg}	2023-09-16 01:57:34.74	2023-09-17 01:46:56.396
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, "storeId", "billboardId", name, "createdAt", "updatedAt") FROM stdin;
5d07af62-f5bf-4d70-9263-cbfabc4773a5	573ae13b-576a-48e4-9a04-d8d029024ac6	4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36	Suits	2023-09-16 01:57:52.775	2023-09-17 01:47:49.687
12e81495-2d6f-418d-a85a-37065588b07c	573ae13b-576a-48e4-9a04-d8d029024ac6	4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36	Shoes	2023-09-17 01:48:00.042	2023-09-17 01:47:59.949
77518b62-9efd-4e94-ab54-4d6dc73122f8	573ae13b-576a-48e4-9a04-d8d029024ac6	4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36	Glasses	2023-09-17 01:48:19.558	2023-09-17 01:48:19.527
931edf72-f5b3-4d47-80fe-f4d3261bc991	573ae13b-576a-48e4-9a04-d8d029024ac6	4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36	Ties	2023-09-17 01:52:45.016	2023-09-17 01:52:44.984
7cd2b9ac-cdca-4a4f-a955-70a5da6542b4	573ae13b-576a-48e4-9a04-d8d029024ac6	4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36	Watches	2023-09-17 01:48:37.758	2023-09-18 00:20:36.046
\.


--
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Color" (id, "storeId", name, value, "createdAt", "updatedAt") FROM stdin;
88c3e3bb-cf41-4f3e-87f3-19a7060e5b00	573ae13b-576a-48e4-9a04-d8d029024ac6	Lime	lime	2023-09-16 01:58:25.293	2023-09-16 01:58:25.203
aa398c70-2ec6-400f-b7d2-39143bc2f302	573ae13b-576a-48e4-9a04-d8d029024ac6	Black	black	2023-09-17 01:51:08.476	2023-09-17 01:51:08.382
ca35ef23-6174-4c1c-826d-fcdcee8e38a5	573ae13b-576a-48e4-9a04-d8d029024ac6	Gray	gray	2023-09-17 01:51:21.408	2023-09-17 01:51:21.316
327da30f-a579-4b89-a088-8c79b5462018	573ae13b-576a-48e4-9a04-d8d029024ac6	Beige	beige	2023-09-17 01:51:45.945	2023-09-17 01:51:45.912
e804254a-5a96-458e-a41c-195247f5d776	573ae13b-576a-48e4-9a04-d8d029024ac6	White	white	2023-09-17 01:51:54.534	2023-09-17 01:51:54.502
130e03fa-9300-4191-a95b-d89a06660a55	573ae13b-576a-48e4-9a04-d8d029024ac6	Yellow	yellow	2023-09-17 01:52:02.771	2023-09-17 01:52:02.739
325f2ba2-c72b-4cea-b5ef-efe63858b664	573ae13b-576a-48e4-9a04-d8d029024ac6	Blue	blue	2023-09-17 01:55:43.358	2023-09-17 01:55:43.266
90ddae27-99cd-4341-97f3-10d72b00f6de	573ae13b-576a-48e4-9a04-d8d029024ac6	Red	red	2023-09-17 01:55:50.359	2023-09-17 01:55:50.268
39c93453-db90-4ebe-97a9-2a8becdde78e	573ae13b-576a-48e4-9a04-d8d029024ac6	Brown	#b05a45	2023-09-17 01:58:07.942	2023-09-17 01:58:41.649
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "storeId", "isPaid", phone, address, "createdAt", "updatedAt") FROM stdin;
ad18a087-1adf-4707-af27-795774923a37	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:43:25.702	2023-09-16 22:43:25.671
19ee3760-ec64-4a91-b5a1-d06e8538bae0	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:43:46.326	2023-09-16 22:43:46.295
f5d51c7b-898a-4202-9978-980d1c5ebc97	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:43:49.189	2023-09-16 22:43:49.158
ada0579e-7475-4afb-9b3c-0a96579b4f3d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:45:05.951	2023-09-16 22:45:05.92
f9f32ebd-2994-4b0c-8ccf-f4c63a41b32e	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:45:53.035	2023-09-16 22:45:53.004
2accc49f-d2cc-4b78-a18c-fda37710267d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:45:58.814	2023-09-16 22:45:58.783
d82ea6fc-ea67-4180-ac60-81404bf44ea6	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:48:57.428	2023-09-16 22:48:57.398
c1bd1daa-47fd-4d2c-95a1-394a91b24480	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:49:25.074	2023-09-16 22:49:25.044
00a21a70-ccff-45fa-8a75-647bd680e9ac	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:49:29.586	2023-09-16 22:49:29.557
4e2d99c1-2707-468a-a46d-bfb793be8cca	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:49:51.607	2023-09-16 22:49:51.577
bf541a40-1091-4e32-b5a3-f594f177764d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:50:47.115	2023-09-16 22:50:47.085
fba15c40-0ce5-4d50-a89d-b0fb42a58de4	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-16 22:50:55.637	2023-09-16 22:50:55.607
8d66d15b-7b15-472a-8715-0bd5d71c2fd1	573ae13b-576a-48e4-9a04-d8d029024ac6	t	+201119523259	Egypt, sdf, \\zifta, الفيوم, 65985, EG	2023-09-16 23:29:31.384	2023-09-16 23:30:25.006
636e8bce-619e-4c3c-8fc5-d866bb81ebd9	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:15:10.001	2023-09-18 01:15:09.97
79a606a6-9a8d-4839-9901-0fcae4facfcc	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:29.707	2023-09-18 01:36:29.677
3c445cae-c7a6-4f5a-9d57-5e905dbcf037	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:40.945	2023-09-18 01:36:40.916
61c5a043-8912-4f5b-bb91-0b97a77987d6	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:42.953	2023-09-18 01:36:42.923
3a290b02-53a0-4705-96da-bcb99cb0e513	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:44.205	2023-09-18 01:36:44.175
9b84d30e-2644-46a5-81c0-c13a21435fe6	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:45.966	2023-09-18 01:36:45.936
daae387f-f93d-40e3-a8ca-2f5d21b9b28d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:46.92	2023-09-18 01:36:46.889
9ead8239-3176-4202-b300-f4563beb0122	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:50.341	2023-09-18 01:36:50.309
025656a2-d6e6-4a0e-b114-e0a24228ead1	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:52.049	2023-09-18 01:36:52.017
ebb053b9-e5e8-46d9-9877-aae941849bef	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:54.555	2023-09-18 01:36:54.524
b64e4bf8-a181-4e61-896f-f9723c0e687d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:55.082	2023-09-18 01:36:55.052
82c3eee1-bead-4122-965d-78f88553f8a1	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:55.449	2023-09-18 01:36:55.419
38c00894-88d6-4d03-8947-c3cda0c1dc26	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:55.636	2023-09-18 01:36:55.605
b91c4a90-38a2-4ed2-a4c5-4a6212653cb5	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:55.932	2023-09-18 01:36:55.9
46c6001a-3fde-4e42-a41d-cc37f27253c2	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:56.412	2023-09-18 01:36:56.382
b208c83d-dfe4-4573-8f02-1e6d7fbd775d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:56.6	2023-09-18 01:36:56.57
468e4847-06fc-4cb7-b8e5-60605c0fe80c	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:56.78	2023-09-18 01:36:56.748
154fbabd-db08-4b87-97e4-f8228d268c2a	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:57.314	2023-09-18 01:36:57.282
8b333f7b-53af-4e46-b97d-7fe6b5e136ba	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:57.686	2023-09-18 01:36:57.655
b1f158d8-3ea5-4b59-b054-267f4a748254	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:57.915	2023-09-18 01:36:57.885
0c785ba1-71b4-43f4-9b45-3fe7ee5788ee	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:57.969	2023-09-18 01:36:57.938
3d5b2084-7770-493e-9f46-99ebc4a7bee3	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:36:58.641	2023-09-18 01:36:58.61
09dd6588-8797-4585-b2c8-ddb603216fc5	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:37:01.624	2023-09-18 01:37:01.593
3e8ff49d-6545-402d-9422-adf21a88e941	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:08.763	2023-09-18 01:38:08.731
7d8450e4-be18-41b7-b9db-45157958d619	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:16.497	2023-09-18 01:38:16.466
d172e3e0-371f-4451-aca8-773321afa857	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:16.544	2023-09-18 01:38:16.512
339512e6-2e02-4e2a-bd01-9942107bec38	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:18.228	2023-09-18 01:38:18.197
4cf31b6d-efba-48e3-b89b-01a42e19adb5	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:19.938	2023-09-18 01:38:19.906
bcbf6592-a22e-4d98-92d6-0c106956a6a4	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:22.059	2023-09-18 01:38:22.028
b1a92ca0-5f70-403c-98d6-158d5a544dc3	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:38:23.906	2023-09-18 01:38:23.875
9e8373d0-58a9-45b6-8d65-ef9e9567b373	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:49:11.201	2023-09-18 01:49:11.168
0cdfe3c0-cb40-40f5-a9be-75727db05553	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:49:47.258	2023-09-18 01:49:47.225
3d1ea094-b606-4ef0-8c0a-c491415612a4	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 01:54:31.284	2023-09-18 01:54:31.25
c343b743-7702-4012-bfaa-77dab760efd0	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:02:53.865	2023-09-18 02:02:53.83
ae504191-99fa-4ff5-98c7-7ac7be3a44fb	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:37.72	2023-09-18 02:17:37.685
3d018812-09df-4e84-931d-34afe85f9066	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:55.859	2023-09-18 02:17:55.824
c61bd4e2-4cc8-44fd-a4a6-61adeb9d3f09	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:57.632	2023-09-18 02:17:57.598
652a3c0e-4054-41d3-8a88-8add7d899cbc	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:58.568	2023-09-18 02:17:58.534
463692be-97be-4e3b-8a25-83c075adf64b	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:58.764	2023-09-18 02:17:58.729
588bb7b4-fb52-4d01-9405-7ddf8c551b2d	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:59.769	2023-09-18 02:17:59.735
7b1b6f41-9d9a-4f45-8cdf-a711ef15e6c8	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:59.732	2023-09-18 02:17:59.698
757dc41f-cee9-4f1f-8727-49eb17db3441	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:17:59.973	2023-09-18 02:17:59.939
be27e5fc-dce1-45b2-903e-f241beac6d0b	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:18:00.413	2023-09-18 02:18:00.379
5ff7652e-62ca-4bdd-a391-fd9609ba8dc2	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:18:00.61	2023-09-18 02:18:00.575
25b68cbf-ec43-4e20-9f3d-21d77698c397	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:18:00.797	2023-09-18 02:18:00.764
db80bdf8-76f7-4d63-ab7c-223291be66e5	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 02:18:00.879	2023-09-18 02:18:00.845
b812f116-21c8-43ca-968f-2400d18fc242	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:11:43.033	2023-09-18 03:11:43.001
76bab0cf-2e78-450b-b6a7-1b766c57a4e9	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:44:08.749	2023-09-18 03:44:08.716
2a819d0b-bb36-47df-a6df-353788f38734	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:47:27.949	2023-09-18 03:47:27.917
0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	573ae13b-576a-48e4-9a04-d8d029024ac6	t	+201119523259	Egypt, sdf, \\zifta, الفيوم, 65985, EG	2023-09-18 03:50:14.039	2023-09-18 03:50:32.577
14b91d0a-1712-4c46-bc74-706d36bba2f1	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:51:00.265	2023-09-18 03:51:00.234
3752ebc3-21d0-4a16-bb70-a26488b8c0de	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:51:12.538	2023-09-18 03:51:12.507
c702f1a5-812d-44ef-bdc8-b04242ee4eca	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:53:44.988	2023-09-18 03:53:44.957
c86e9d66-ad21-4393-af58-66badc4fffcc	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:54:13.751	2023-09-18 03:54:13.72
1a6bf844-e7ab-46c2-9ee2-49c27f7d4a30	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:54:39.281	2023-09-18 03:54:39.25
b4a13ca0-7b97-4ff9-9ee8-5996d4df4d77	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:54:44.105	2023-09-18 03:54:44.075
a30b4d3e-6c3b-4d28-b1f7-e42e07c7cb7f	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:54:44.569	2023-09-18 03:54:44.538
1203f940-ac3f-4315-bb84-1f04eeb6b6ce	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:54:46.751	2023-09-18 03:54:46.72
9a1005aa-63b0-4628-921a-ac7a80ffbf69	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 03:54:46.839	2023-09-18 03:54:46.807
6e3f17f5-c283-4454-8e1c-45e4eae11cf4	573ae13b-576a-48e4-9a04-d8d029024ac6	t	+201119523259	Egypt, sdf, \\zifta, الفيوم, 65985, EG	2023-09-18 03:55:11.244	2023-09-18 03:55:31.848
bc402568-2c56-4b53-8d18-b3d181b96765	573ae13b-576a-48e4-9a04-d8d029024ac6	t	+201119523259	Egypt, sdf, \\zifta, الفيوم, 65985, EG	2023-09-18 03:56:40.306	2023-09-18 03:57:04.104
857f03be-39c2-4f01-8785-6b8869601aff	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-09-18 12:46:59.195	2023-09-18 12:46:59.165
58d47581-b629-4d1b-b4a2-1a320b6a5bd9	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-10-01 16:35:25.332	2023-10-01 16:35:25.299
02727e5a-0ce3-460b-8093-ff2b340950c7	573ae13b-576a-48e4-9a04-d8d029024ac6	f			2023-10-01 16:35:38.31	2023-10-01 16:35:38.278
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId") FROM stdin;
21432286-f51e-462c-a5ce-4e8ea2cdc305	ad18a087-1adf-4707-af27-795774923a37	80849866-5ccf-4dbc-aa19-6b6003137daa
fee43051-1251-4bd0-8210-fca7c4c8e383	19ee3760-ec64-4a91-b5a1-d06e8538bae0	80849866-5ccf-4dbc-aa19-6b6003137daa
711ba0a7-4400-4dce-b7d5-981e651f77db	f5d51c7b-898a-4202-9978-980d1c5ebc97	80849866-5ccf-4dbc-aa19-6b6003137daa
83d6aaf0-59e7-4ce1-a87c-ed6e99488ee2	ada0579e-7475-4afb-9b3c-0a96579b4f3d	80849866-5ccf-4dbc-aa19-6b6003137daa
3373bfac-2730-4f91-81b4-d92dbccef1be	f9f32ebd-2994-4b0c-8ccf-f4c63a41b32e	80849866-5ccf-4dbc-aa19-6b6003137daa
0fa66430-b3c7-41d9-8657-964db3d5829c	2accc49f-d2cc-4b78-a18c-fda37710267d	80849866-5ccf-4dbc-aa19-6b6003137daa
45bd903f-c4d8-4373-99d3-5b35b899b9bd	d82ea6fc-ea67-4180-ac60-81404bf44ea6	80849866-5ccf-4dbc-aa19-6b6003137daa
db0ebc4f-7abe-4e85-b19b-f47d2db5fcc6	c1bd1daa-47fd-4d2c-95a1-394a91b24480	80849866-5ccf-4dbc-aa19-6b6003137daa
93867616-d516-499e-909c-3dd9cd704496	00a21a70-ccff-45fa-8a75-647bd680e9ac	80849866-5ccf-4dbc-aa19-6b6003137daa
7aa1884b-cde2-4e91-836b-4a0e86e74554	4e2d99c1-2707-468a-a46d-bfb793be8cca	80849866-5ccf-4dbc-aa19-6b6003137daa
9ce98c94-ee79-456b-8e7a-bec89e9e98e3	bf541a40-1091-4e32-b5a3-f594f177764d	80849866-5ccf-4dbc-aa19-6b6003137daa
8f3b65f6-b774-49c3-9f73-05549db8d138	fba15c40-0ce5-4d50-a89d-b0fb42a58de4	80849866-5ccf-4dbc-aa19-6b6003137daa
faca1fe2-d369-4924-9840-6cf8b558e25a	8d66d15b-7b15-472a-8715-0bd5d71c2fd1	80849866-5ccf-4dbc-aa19-6b6003137daa
85eafda2-8a14-43cf-8e9d-61214e195dde	636e8bce-619e-4c3c-8fc5-d866bb81ebd9	13dd9f54-368e-45ed-a6c4-abb9f982a877
f67ffe08-3327-4ae3-9b44-11d9a5e658be	79a606a6-9a8d-4839-9901-0fcae4facfcc	4ffce1c8-9db7-49b9-892c-7e3eada42642
191f42d3-3152-4645-8f42-54208d301a4f	79a606a6-9a8d-4839-9901-0fcae4facfcc	7d190245-ea68-4be3-a0f7-b0aa79798b45
6480dc6f-eea4-401e-8328-0bf790c293ec	79a606a6-9a8d-4839-9901-0fcae4facfcc	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
8231e81b-f7c4-4688-b94c-ed2c8d939aef	79a606a6-9a8d-4839-9901-0fcae4facfcc	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
116ca561-0601-4cd4-84e2-126e6df0937c	79a606a6-9a8d-4839-9901-0fcae4facfcc	24292c4d-9f2a-44d7-8b8b-ae789e71879d
4e0f77a6-a9e4-4baf-8297-8337dfd9dda1	3c445cae-c7a6-4f5a-9d57-5e905dbcf037	4ffce1c8-9db7-49b9-892c-7e3eada42642
8b2cbd11-c30a-44b0-b53e-89a794fad919	3c445cae-c7a6-4f5a-9d57-5e905dbcf037	7d190245-ea68-4be3-a0f7-b0aa79798b45
4dc78d18-3092-451d-81e7-bd351a78cb70	3c445cae-c7a6-4f5a-9d57-5e905dbcf037	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
d4cd114f-c27c-4bb0-b54d-96138bb08dc4	3c445cae-c7a6-4f5a-9d57-5e905dbcf037	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
a00aca4c-efc0-4147-ae5c-f7ca17674b67	3c445cae-c7a6-4f5a-9d57-5e905dbcf037	24292c4d-9f2a-44d7-8b8b-ae789e71879d
c5bc92fd-87e3-43dc-bbf4-e0be6ec4e26d	61c5a043-8912-4f5b-bb91-0b97a77987d6	4ffce1c8-9db7-49b9-892c-7e3eada42642
8dc6f9cf-21ff-4c40-ac1c-51da5988d675	61c5a043-8912-4f5b-bb91-0b97a77987d6	7d190245-ea68-4be3-a0f7-b0aa79798b45
324dddcc-65a5-4795-b1fd-dac8165ab707	61c5a043-8912-4f5b-bb91-0b97a77987d6	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
680f32bd-d424-4fc4-9bbc-fdc2d6e8489b	61c5a043-8912-4f5b-bb91-0b97a77987d6	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
8e771a09-44af-4018-a5ce-21a573e7caa9	61c5a043-8912-4f5b-bb91-0b97a77987d6	24292c4d-9f2a-44d7-8b8b-ae789e71879d
1b129786-5650-4324-8ed1-f456da5df0b7	3a290b02-53a0-4705-96da-bcb99cb0e513	4ffce1c8-9db7-49b9-892c-7e3eada42642
afc4c0df-d815-4ca4-b454-1cff08de9159	3a290b02-53a0-4705-96da-bcb99cb0e513	7d190245-ea68-4be3-a0f7-b0aa79798b45
c50f388d-b44c-4bfa-85a3-6815490fc700	3a290b02-53a0-4705-96da-bcb99cb0e513	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
b5262e0f-c96d-48c0-8a3e-5663550c5ac4	3a290b02-53a0-4705-96da-bcb99cb0e513	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
640f4474-2f84-4b86-ab05-95f52d40ed84	3a290b02-53a0-4705-96da-bcb99cb0e513	24292c4d-9f2a-44d7-8b8b-ae789e71879d
5dc78616-8c85-42e5-9835-e5795de027e0	9b84d30e-2644-46a5-81c0-c13a21435fe6	4ffce1c8-9db7-49b9-892c-7e3eada42642
2296f5f6-7a70-4b36-9250-8c74d287db8f	9b84d30e-2644-46a5-81c0-c13a21435fe6	7d190245-ea68-4be3-a0f7-b0aa79798b45
182167be-f746-4646-88ff-996c1e2a4b89	9b84d30e-2644-46a5-81c0-c13a21435fe6	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
da52677d-4147-498a-86f0-27be496f3990	9b84d30e-2644-46a5-81c0-c13a21435fe6	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
07df3130-7eb1-49d9-baa1-6f611ae08581	9b84d30e-2644-46a5-81c0-c13a21435fe6	24292c4d-9f2a-44d7-8b8b-ae789e71879d
b506889d-faad-4813-bc6b-8393670d4151	daae387f-f93d-40e3-a8ca-2f5d21b9b28d	4ffce1c8-9db7-49b9-892c-7e3eada42642
e8d41cbb-0b5f-4603-b449-f026512b073b	daae387f-f93d-40e3-a8ca-2f5d21b9b28d	7d190245-ea68-4be3-a0f7-b0aa79798b45
5f025086-e43c-4237-930e-29a60f8572a9	daae387f-f93d-40e3-a8ca-2f5d21b9b28d	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
3d94897e-9d9e-4411-9c91-25a363313e76	daae387f-f93d-40e3-a8ca-2f5d21b9b28d	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
36c5fa61-39a6-46e4-b36e-c6e4c3b9f9e5	daae387f-f93d-40e3-a8ca-2f5d21b9b28d	24292c4d-9f2a-44d7-8b8b-ae789e71879d
88adfce7-f659-4a67-903b-b8cdc4b526d5	9ead8239-3176-4202-b300-f4563beb0122	4ffce1c8-9db7-49b9-892c-7e3eada42642
a186b277-9a10-4a9d-a717-ef086ec4c818	9ead8239-3176-4202-b300-f4563beb0122	7d190245-ea68-4be3-a0f7-b0aa79798b45
1f1af000-4b7d-4846-8f75-7c0da0c69af9	9ead8239-3176-4202-b300-f4563beb0122	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
6f2d08b2-4c0c-4126-94bd-9d4d92f2cc9a	9ead8239-3176-4202-b300-f4563beb0122	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
79104f28-117f-40a9-9bc3-fde56b2cb22e	9ead8239-3176-4202-b300-f4563beb0122	24292c4d-9f2a-44d7-8b8b-ae789e71879d
c829c902-eebb-45dd-872b-c8436305416e	025656a2-d6e6-4a0e-b114-e0a24228ead1	4ffce1c8-9db7-49b9-892c-7e3eada42642
7518b0bd-8729-4c7a-a9ab-dec3500586bf	025656a2-d6e6-4a0e-b114-e0a24228ead1	7d190245-ea68-4be3-a0f7-b0aa79798b45
70208a89-d374-4008-b619-17c4aa6218b8	025656a2-d6e6-4a0e-b114-e0a24228ead1	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
17a8fee3-2d49-4e38-ab23-4dd43874f06e	025656a2-d6e6-4a0e-b114-e0a24228ead1	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
188c0686-2a2f-4f2f-b6b3-503f23848464	025656a2-d6e6-4a0e-b114-e0a24228ead1	24292c4d-9f2a-44d7-8b8b-ae789e71879d
0bb323de-3f2f-4461-a88e-0cacd2ee2057	ebb053b9-e5e8-46d9-9877-aae941849bef	4ffce1c8-9db7-49b9-892c-7e3eada42642
254370fa-f7e0-4b8e-812c-dfc96cbcccfa	ebb053b9-e5e8-46d9-9877-aae941849bef	7d190245-ea68-4be3-a0f7-b0aa79798b45
baa8b644-771d-4ef8-8aa8-b5130cefdb09	ebb053b9-e5e8-46d9-9877-aae941849bef	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
65ef268b-4b73-4391-b063-9c22be07d2c7	ebb053b9-e5e8-46d9-9877-aae941849bef	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
da9b6b54-06d6-41e3-a26c-e9c1b19bd3c0	ebb053b9-e5e8-46d9-9877-aae941849bef	24292c4d-9f2a-44d7-8b8b-ae789e71879d
a3f7f8fe-0750-483d-bf3a-92c9fbb93266	b64e4bf8-a181-4e61-896f-f9723c0e687d	4ffce1c8-9db7-49b9-892c-7e3eada42642
75770eab-d6fd-42c7-ac65-a536d448be40	b64e4bf8-a181-4e61-896f-f9723c0e687d	7d190245-ea68-4be3-a0f7-b0aa79798b45
bedc6ba4-1fdd-4282-8e90-b879afe2c86c	b64e4bf8-a181-4e61-896f-f9723c0e687d	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
7c5c845b-1b98-4ec1-93f9-a9a315e6c636	b64e4bf8-a181-4e61-896f-f9723c0e687d	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
3a596b43-b704-4c55-ac5f-5e54a35a5257	82c3eee1-bead-4122-965d-78f88553f8a1	4ffce1c8-9db7-49b9-892c-7e3eada42642
b133a048-855c-4d68-908f-6f7ca2777b69	b64e4bf8-a181-4e61-896f-f9723c0e687d	24292c4d-9f2a-44d7-8b8b-ae789e71879d
992e48ef-3cf1-4030-b9d3-6240a4d64b11	82c3eee1-bead-4122-965d-78f88553f8a1	7d190245-ea68-4be3-a0f7-b0aa79798b45
20e0f0b4-6e38-4509-9131-75ff4747c084	38c00894-88d6-4d03-8947-c3cda0c1dc26	4ffce1c8-9db7-49b9-892c-7e3eada42642
d436419d-054c-45da-9d53-3c5be29f8d85	82c3eee1-bead-4122-965d-78f88553f8a1	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
ef044f6d-995c-414e-ba70-b9f2f466a0f7	38c00894-88d6-4d03-8947-c3cda0c1dc26	7d190245-ea68-4be3-a0f7-b0aa79798b45
f8bea4bb-efc4-435f-83d4-aabbc3f91c43	82c3eee1-bead-4122-965d-78f88553f8a1	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
c1cbaa4e-a4d1-448b-a16d-6e0f9f282866	38c00894-88d6-4d03-8947-c3cda0c1dc26	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
54ce8053-47c6-4dce-8768-20382058bc71	82c3eee1-bead-4122-965d-78f88553f8a1	24292c4d-9f2a-44d7-8b8b-ae789e71879d
0b7020a2-640b-4ef7-95ec-b1e5f7b90d26	38c00894-88d6-4d03-8947-c3cda0c1dc26	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
498b9681-aee4-4dd2-832d-7b33a1602522	b91c4a90-38a2-4ed2-a4c5-4a6212653cb5	4ffce1c8-9db7-49b9-892c-7e3eada42642
f2355283-b68e-4c02-affd-71699ba5e617	38c00894-88d6-4d03-8947-c3cda0c1dc26	24292c4d-9f2a-44d7-8b8b-ae789e71879d
7c00a6ec-0e22-4ca1-ad7b-963816c7c90a	b91c4a90-38a2-4ed2-a4c5-4a6212653cb5	7d190245-ea68-4be3-a0f7-b0aa79798b45
d7cdf5c4-aa35-431c-86e3-5995e6ed57e2	b91c4a90-38a2-4ed2-a4c5-4a6212653cb5	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
bb778ff5-38d2-46bd-bdc1-67b68e5eb3f6	46c6001a-3fde-4e42-a41d-cc37f27253c2	4ffce1c8-9db7-49b9-892c-7e3eada42642
9e9c40b8-79e0-4542-896c-ade6658ddee4	b91c4a90-38a2-4ed2-a4c5-4a6212653cb5	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
4f36469c-5be1-451f-9e1b-7168bf8477f5	46c6001a-3fde-4e42-a41d-cc37f27253c2	7d190245-ea68-4be3-a0f7-b0aa79798b45
dc1c0dcc-fc58-4d07-a5c2-aa2c952bd63d	b208c83d-dfe4-4573-8f02-1e6d7fbd775d	4ffce1c8-9db7-49b9-892c-7e3eada42642
64013b5f-8fef-46da-8f6c-be6845e972c3	b91c4a90-38a2-4ed2-a4c5-4a6212653cb5	24292c4d-9f2a-44d7-8b8b-ae789e71879d
50312f93-e5a6-4c2d-bc21-a799b304774c	46c6001a-3fde-4e42-a41d-cc37f27253c2	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
c20c4e87-11d1-4af6-88b0-dade7287cf2e	b208c83d-dfe4-4573-8f02-1e6d7fbd775d	7d190245-ea68-4be3-a0f7-b0aa79798b45
6583bbce-2447-4239-ab06-c51d8002d452	46c6001a-3fde-4e42-a41d-cc37f27253c2	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
178cf339-d4fe-4b66-8f6c-41f28e745f1e	468e4847-06fc-4cb7-b8e5-60605c0fe80c	4ffce1c8-9db7-49b9-892c-7e3eada42642
d96e0965-584d-4a6f-b0fd-b40e79bc3147	b208c83d-dfe4-4573-8f02-1e6d7fbd775d	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
e0825aed-6bdf-4228-b1c0-e70f8dc3fa63	46c6001a-3fde-4e42-a41d-cc37f27253c2	24292c4d-9f2a-44d7-8b8b-ae789e71879d
d806edb0-fcc1-441d-afa1-b4c98ebf19bc	468e4847-06fc-4cb7-b8e5-60605c0fe80c	7d190245-ea68-4be3-a0f7-b0aa79798b45
a1381e5c-ec3b-44c5-a688-c7e1b186ecd1	b208c83d-dfe4-4573-8f02-1e6d7fbd775d	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
1d74f27e-a5c3-4fd8-8032-3d49827a3101	468e4847-06fc-4cb7-b8e5-60605c0fe80c	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
1a342997-4bde-4190-8ebd-6bfc5f4c279e	b208c83d-dfe4-4573-8f02-1e6d7fbd775d	24292c4d-9f2a-44d7-8b8b-ae789e71879d
3ab9c74e-e416-422a-b3ad-01fc57b9ab62	468e4847-06fc-4cb7-b8e5-60605c0fe80c	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
3d7e3e06-0e9e-4bf9-8a0d-42a7fe4261f0	468e4847-06fc-4cb7-b8e5-60605c0fe80c	24292c4d-9f2a-44d7-8b8b-ae789e71879d
f9174c81-8149-4007-abad-4a34ead82885	154fbabd-db08-4b87-97e4-f8228d268c2a	4ffce1c8-9db7-49b9-892c-7e3eada42642
3fbb0975-7a3b-4988-bc4d-6ed282770df4	154fbabd-db08-4b87-97e4-f8228d268c2a	7d190245-ea68-4be3-a0f7-b0aa79798b45
37109ee8-71c0-4b8a-a205-93ec6f81d1bd	154fbabd-db08-4b87-97e4-f8228d268c2a	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
3c399703-7eea-4c48-b860-433834bbbd69	154fbabd-db08-4b87-97e4-f8228d268c2a	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
e494fddb-983c-4b5a-8588-7076ba916008	154fbabd-db08-4b87-97e4-f8228d268c2a	24292c4d-9f2a-44d7-8b8b-ae789e71879d
ad47a1a8-72ab-481c-b95d-652749b4f34d	8b333f7b-53af-4e46-b97d-7fe6b5e136ba	4ffce1c8-9db7-49b9-892c-7e3eada42642
33e04d72-9d9c-4e99-bb89-4836e9387b56	8b333f7b-53af-4e46-b97d-7fe6b5e136ba	7d190245-ea68-4be3-a0f7-b0aa79798b45
597c879b-e7a8-4a6d-b1f8-45904187c804	b1f158d8-3ea5-4b59-b054-267f4a748254	4ffce1c8-9db7-49b9-892c-7e3eada42642
f5b9e01a-edfc-4492-a30c-f096f90aae20	8b333f7b-53af-4e46-b97d-7fe6b5e136ba	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
fe3c1a8b-bc99-4e04-86c8-df36e3e93cf9	0c785ba1-71b4-43f4-9b45-3fe7ee5788ee	4ffce1c8-9db7-49b9-892c-7e3eada42642
0a9df6c6-c9d3-4c0d-b2a0-6171b41f588c	b1f158d8-3ea5-4b59-b054-267f4a748254	7d190245-ea68-4be3-a0f7-b0aa79798b45
8ebeed20-1c5d-403d-9257-feb2fb76393a	8b333f7b-53af-4e46-b97d-7fe6b5e136ba	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
587da6cd-1016-405e-b064-48f6d8de5ab4	0c785ba1-71b4-43f4-9b45-3fe7ee5788ee	7d190245-ea68-4be3-a0f7-b0aa79798b45
1fe5f01f-0399-4afe-a206-b748f71feaab	b1f158d8-3ea5-4b59-b054-267f4a748254	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
94bbdccb-d9b0-460d-93c4-67ab4ee34547	b1f158d8-3ea5-4b59-b054-267f4a748254	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
d8356a84-d628-4958-a6b6-54809accfe18	b1f158d8-3ea5-4b59-b054-267f4a748254	24292c4d-9f2a-44d7-8b8b-ae789e71879d
4d2d521e-9055-421a-9aa0-c5b8a521faea	8b333f7b-53af-4e46-b97d-7fe6b5e136ba	24292c4d-9f2a-44d7-8b8b-ae789e71879d
d0075de9-cfca-404b-8879-4bf678f7f120	0c785ba1-71b4-43f4-9b45-3fe7ee5788ee	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
f259b5af-363b-4eb8-8dea-f8ac9859a331	0c785ba1-71b4-43f4-9b45-3fe7ee5788ee	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
24501601-7ba3-40ac-9a74-aa23ab4e4f63	0c785ba1-71b4-43f4-9b45-3fe7ee5788ee	24292c4d-9f2a-44d7-8b8b-ae789e71879d
9df8ac75-a38f-4473-af8b-38e6cf543d6f	3d5b2084-7770-493e-9f46-99ebc4a7bee3	4ffce1c8-9db7-49b9-892c-7e3eada42642
c466632b-57e5-4dca-b393-6393de54efd6	3d5b2084-7770-493e-9f46-99ebc4a7bee3	7d190245-ea68-4be3-a0f7-b0aa79798b45
4d41e08f-a380-4ef4-82d2-cc15a8420d3e	3d5b2084-7770-493e-9f46-99ebc4a7bee3	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
7db25c2a-7bff-428b-a34f-5d2ba10dbdf7	3d5b2084-7770-493e-9f46-99ebc4a7bee3	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
2aa37d3e-01b0-483a-a742-cb0de1e6678b	3d5b2084-7770-493e-9f46-99ebc4a7bee3	24292c4d-9f2a-44d7-8b8b-ae789e71879d
1ff91e0e-76d4-485c-9837-c7571c5c8a2a	09dd6588-8797-4585-b2c8-ddb603216fc5	4ffce1c8-9db7-49b9-892c-7e3eada42642
9b4a08da-1615-42bd-a3d2-6b3a7148fc55	09dd6588-8797-4585-b2c8-ddb603216fc5	7d190245-ea68-4be3-a0f7-b0aa79798b45
c223e6b9-d403-4a75-aa88-71c09c80dd3d	09dd6588-8797-4585-b2c8-ddb603216fc5	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
f0a4c42c-c517-4cbc-a073-0654002cd795	09dd6588-8797-4585-b2c8-ddb603216fc5	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
e61906ca-d08f-4a8f-8f2f-3bbbe7f946ce	3e8ff49d-6545-402d-9422-adf21a88e941	d1b7d2e9-f5d3-424b-a536-fd166f264181
50e92633-4569-478d-934a-678b1975b7a7	3e8ff49d-6545-402d-9422-adf21a88e941	d20a99f4-e67b-4400-b142-1e0da7b5dd96
c74f531c-73e1-4ff8-a785-578f7c1127a9	3e8ff49d-6545-402d-9422-adf21a88e941	0461d1ed-4918-47be-b10f-6ddefaacb2f8
477f4b2b-2e26-451a-85a6-3c6c8a3042ef	3e8ff49d-6545-402d-9422-adf21a88e941	24292c4d-9f2a-44d7-8b8b-ae789e71879d
f1c40a9d-7857-474c-8df6-cc76ca47bde8	3e8ff49d-6545-402d-9422-adf21a88e941	4ffce1c8-9db7-49b9-892c-7e3eada42642
4ba7e5af-f927-423e-88ed-05bb93437d3c	3e8ff49d-6545-402d-9422-adf21a88e941	7d190245-ea68-4be3-a0f7-b0aa79798b45
072d7f1a-a4fb-443c-a2e4-d1feb584e261	7d8450e4-be18-41b7-b9db-45157958d619	d1b7d2e9-f5d3-424b-a536-fd166f264181
03bf9cd2-626e-42b2-929e-82ddeaa449c6	d172e3e0-371f-4451-aca8-773321afa857	d1b7d2e9-f5d3-424b-a536-fd166f264181
1c4245ae-7e75-404f-9312-7e8a34c413f7	7d8450e4-be18-41b7-b9db-45157958d619	d20a99f4-e67b-4400-b142-1e0da7b5dd96
d3bf310e-3823-40c2-9c57-470e4c92b48b	d172e3e0-371f-4451-aca8-773321afa857	d20a99f4-e67b-4400-b142-1e0da7b5dd96
122e3965-c581-4256-9c64-9c7621f82fd1	7d8450e4-be18-41b7-b9db-45157958d619	0461d1ed-4918-47be-b10f-6ddefaacb2f8
b8e7d79e-306d-4aa0-9ce2-ae0fb6dfb17f	d172e3e0-371f-4451-aca8-773321afa857	0461d1ed-4918-47be-b10f-6ddefaacb2f8
b2ce11d0-dd66-4826-9e30-323aa4a8908f	7d8450e4-be18-41b7-b9db-45157958d619	24292c4d-9f2a-44d7-8b8b-ae789e71879d
864bad9e-7bf8-46cf-98bd-80ec0158f5cc	d172e3e0-371f-4451-aca8-773321afa857	24292c4d-9f2a-44d7-8b8b-ae789e71879d
d7087a38-6427-41bd-94cb-173d7aab8b2a	7d8450e4-be18-41b7-b9db-45157958d619	4ffce1c8-9db7-49b9-892c-7e3eada42642
0b0a2842-2398-489b-bfd4-e72a3fcca825	d172e3e0-371f-4451-aca8-773321afa857	4ffce1c8-9db7-49b9-892c-7e3eada42642
8baaee09-72a7-4ddd-b454-85c10751ebb3	7d8450e4-be18-41b7-b9db-45157958d619	7d190245-ea68-4be3-a0f7-b0aa79798b45
5b3df6c8-6546-4f15-ad90-89441b115183	d172e3e0-371f-4451-aca8-773321afa857	7d190245-ea68-4be3-a0f7-b0aa79798b45
748672d7-2a46-48a7-8160-b50134444b4e	339512e6-2e02-4e2a-bd01-9942107bec38	d1b7d2e9-f5d3-424b-a536-fd166f264181
3131f8da-7c18-4829-a421-c6422e36a38a	339512e6-2e02-4e2a-bd01-9942107bec38	d20a99f4-e67b-4400-b142-1e0da7b5dd96
8856adfc-5da4-4558-b63a-25e123f3d83b	339512e6-2e02-4e2a-bd01-9942107bec38	0461d1ed-4918-47be-b10f-6ddefaacb2f8
02e0b99d-1b1f-465c-9403-da71df88724f	339512e6-2e02-4e2a-bd01-9942107bec38	24292c4d-9f2a-44d7-8b8b-ae789e71879d
27dcf3bb-1db3-4c46-a5fa-9d60890b7731	339512e6-2e02-4e2a-bd01-9942107bec38	4ffce1c8-9db7-49b9-892c-7e3eada42642
5a1bb0af-4770-420c-a281-000356fdc2ec	4cf31b6d-efba-48e3-b89b-01a42e19adb5	d1b7d2e9-f5d3-424b-a536-fd166f264181
7f99c6de-759c-413f-9638-10da69280fc1	4cf31b6d-efba-48e3-b89b-01a42e19adb5	d20a99f4-e67b-4400-b142-1e0da7b5dd96
1bd75c54-9426-4e09-8531-d761bfd6d97c	4cf31b6d-efba-48e3-b89b-01a42e19adb5	0461d1ed-4918-47be-b10f-6ddefaacb2f8
c7558baa-224c-4302-bfce-7cb396d816bf	4cf31b6d-efba-48e3-b89b-01a42e19adb5	24292c4d-9f2a-44d7-8b8b-ae789e71879d
3ee39f2f-c41b-4fd8-94f0-cf13f35331e4	bcbf6592-a22e-4d98-92d6-0c106956a6a4	d1b7d2e9-f5d3-424b-a536-fd166f264181
39251e72-51a9-47e4-88a7-7f7961f5ed29	bcbf6592-a22e-4d98-92d6-0c106956a6a4	d20a99f4-e67b-4400-b142-1e0da7b5dd96
67651685-7002-4e47-a2dc-19a13cd6c621	bcbf6592-a22e-4d98-92d6-0c106956a6a4	0461d1ed-4918-47be-b10f-6ddefaacb2f8
4a491be4-e70b-46b8-a3c9-11a5f30f25a4	b1a92ca0-5f70-403c-98d6-158d5a544dc3	d1b7d2e9-f5d3-424b-a536-fd166f264181
640b22bb-caf4-4171-9a78-d1ca3cc00d6f	b1a92ca0-5f70-403c-98d6-158d5a544dc3	d20a99f4-e67b-4400-b142-1e0da7b5dd96
59b77f87-d35c-40bb-9ac3-4e03245dcb90	9e8373d0-58a9-45b6-8d65-ef9e9567b373	8c2b4018-f88d-4d46-aefe-d893778b16d1
45b2da5f-f26d-4662-b85b-71c28ee000d7	9e8373d0-58a9-45b6-8d65-ef9e9567b373	fe5d0c2a-96b4-4a77-9f94-5000c110f8ad
fa3a6fef-e71d-4758-b590-cb3c18c1a685	9e8373d0-58a9-45b6-8d65-ef9e9567b373	d1b7d2e9-f5d3-424b-a536-fd166f264181
6068f856-1dd0-427a-ab9c-67fff31fa176	9e8373d0-58a9-45b6-8d65-ef9e9567b373	d20a99f4-e67b-4400-b142-1e0da7b5dd96
6c0da175-82e7-4586-ba45-65bfb9f6d3ed	0cdfe3c0-cb40-40f5-a9be-75727db05553	43331751-6482-40cd-bca3-09b75f2b9b24
ef81905d-c1b3-4f63-8d77-d5724140f2a6	0cdfe3c0-cb40-40f5-a9be-75727db05553	13dd9f54-368e-45ed-a6c4-abb9f982a877
06ee7d7c-631b-4324-ae28-4c2a64226a32	0cdfe3c0-cb40-40f5-a9be-75727db05553	0461d1ed-4918-47be-b10f-6ddefaacb2f8
4b9c111c-0a46-4732-92bb-56d7f42e3310	0cdfe3c0-cb40-40f5-a9be-75727db05553	6618a025-b6a1-44ab-9a8d-70f54f8e810c
a382dfdc-607d-493f-be26-69780c615a40	0cdfe3c0-cb40-40f5-a9be-75727db05553	af347f0d-3765-4021-93fe-f641fd68a195
b8d2dc3c-d1fc-4c4d-9e99-25b5d7577d0d	0cdfe3c0-cb40-40f5-a9be-75727db05553	8c2b4018-f88d-4d46-aefe-d893778b16d1
d45ddbf6-db0e-468c-83f0-3d0465e22632	0cdfe3c0-cb40-40f5-a9be-75727db05553	fe5d0c2a-96b4-4a77-9f94-5000c110f8ad
7808936c-b05b-499e-8459-077005cf2876	0cdfe3c0-cb40-40f5-a9be-75727db05553	d1b7d2e9-f5d3-424b-a536-fd166f264181
3f9b5503-e90b-45fd-b705-c385b76711e4	0cdfe3c0-cb40-40f5-a9be-75727db05553	d20a99f4-e67b-4400-b142-1e0da7b5dd96
fac36dea-4a3f-4beb-a97e-e8fad54ee220	3d1ea094-b606-4ef0-8c0a-c491415612a4	24292c4d-9f2a-44d7-8b8b-ae789e71879d
f950ae5a-013b-44a3-b506-aa2c57dbef9e	c343b743-7702-4012-bfaa-77dab760efd0	6b955996-80da-45e7-8637-0c89cbfafd11
bf905113-2a46-491a-986d-f5bb2fd48c11	c343b743-7702-4012-bfaa-77dab760efd0	93af2a94-23e9-4af7-a319-e0191c3d8321
77d7d9ac-a7cf-4cab-94de-0284b4624931	c343b743-7702-4012-bfaa-77dab760efd0	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
a1207625-e3b5-40f7-aa4d-0f48aa57da70	c343b743-7702-4012-bfaa-77dab760efd0	337b4748-a84b-401f-b1ed-5376019a639a
16cbfa94-9691-40b8-b47c-b0e97bcc3cb3	c343b743-7702-4012-bfaa-77dab760efd0	43331751-6482-40cd-bca3-09b75f2b9b24
99be068e-ed21-4966-882b-5fc438bd4eb4	c343b743-7702-4012-bfaa-77dab760efd0	13dd9f54-368e-45ed-a6c4-abb9f982a877
8a560a73-518b-4b27-8e3f-8aeb0c1ca56c	c343b743-7702-4012-bfaa-77dab760efd0	0461d1ed-4918-47be-b10f-6ddefaacb2f8
fe0be126-6de6-4b1c-8d06-462480dfc730	c343b743-7702-4012-bfaa-77dab760efd0	6618a025-b6a1-44ab-9a8d-70f54f8e810c
a70bb7cb-839c-4f18-92e1-951fea05f487	c343b743-7702-4012-bfaa-77dab760efd0	af347f0d-3765-4021-93fe-f641fd68a195
d6994686-85a7-4330-a2a7-e02f008048cd	c343b743-7702-4012-bfaa-77dab760efd0	8c2b4018-f88d-4d46-aefe-d893778b16d1
6f7f72d0-18f2-4876-aa47-8eac8b7e7249	c343b743-7702-4012-bfaa-77dab760efd0	fe5d0c2a-96b4-4a77-9f94-5000c110f8ad
e99bb673-df21-478d-b5fe-04f41c21a2ed	c343b743-7702-4012-bfaa-77dab760efd0	d1b7d2e9-f5d3-424b-a536-fd166f264181
02aee851-a2d7-4c43-a0af-dc3b374bad54	c343b743-7702-4012-bfaa-77dab760efd0	d20a99f4-e67b-4400-b142-1e0da7b5dd96
9dfc8969-480b-4293-9029-f29f452f489d	ae504191-99fa-4ff5-98c7-7ac7be3a44fb	4ffce1c8-9db7-49b9-892c-7e3eada42642
588e513b-9d13-4b48-8fcb-f56b2b04769f	ae504191-99fa-4ff5-98c7-7ac7be3a44fb	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
53b0f0e8-2be4-4e74-b919-9ddcf1520cac	ae504191-99fa-4ff5-98c7-7ac7be3a44fb	24292c4d-9f2a-44d7-8b8b-ae789e71879d
a01ec49f-c47b-43a4-9b0d-a82013f2f723	3d018812-09df-4e84-931d-34afe85f9066	4ffce1c8-9db7-49b9-892c-7e3eada42642
b33fa4cf-8280-46e6-914b-eacd4291d29f	3d018812-09df-4e84-931d-34afe85f9066	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
78af9514-d8c6-470a-a44f-a998b09d3a35	3d018812-09df-4e84-931d-34afe85f9066	24292c4d-9f2a-44d7-8b8b-ae789e71879d
7c0c3973-37c5-4711-9bd0-be32b37456a2	c61bd4e2-4cc8-44fd-a4a6-61adeb9d3f09	4ffce1c8-9db7-49b9-892c-7e3eada42642
e8816059-40ea-499c-9324-62e9d2100a2b	c61bd4e2-4cc8-44fd-a4a6-61adeb9d3f09	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
5d45b98a-ffeb-41d1-8ef0-b71ba1918612	c61bd4e2-4cc8-44fd-a4a6-61adeb9d3f09	24292c4d-9f2a-44d7-8b8b-ae789e71879d
09b09ae0-7f3c-4ee6-aa6b-e76e1cbc0e73	652a3c0e-4054-41d3-8a88-8add7d899cbc	4ffce1c8-9db7-49b9-892c-7e3eada42642
48924f6b-62a1-4fc1-9a61-292a2ba83670	463692be-97be-4e3b-8a25-83c075adf64b	4ffce1c8-9db7-49b9-892c-7e3eada42642
03fb68c1-411b-4e54-8bad-f463a1f58f87	652a3c0e-4054-41d3-8a88-8add7d899cbc	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
c9459837-337e-40ed-81ff-6215da0d4701	463692be-97be-4e3b-8a25-83c075adf64b	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
2777c044-d270-469f-ad10-889877e6750b	652a3c0e-4054-41d3-8a88-8add7d899cbc	24292c4d-9f2a-44d7-8b8b-ae789e71879d
9cb09fd4-c046-46b6-8568-e9bd3e940eb8	463692be-97be-4e3b-8a25-83c075adf64b	24292c4d-9f2a-44d7-8b8b-ae789e71879d
dc98e0ba-60c1-4087-8f12-a43215c375b7	588bb7b4-fb52-4d01-9405-7ddf8c551b2d	4ffce1c8-9db7-49b9-892c-7e3eada42642
5d29e769-9256-440a-9309-e82795cd32b2	588bb7b4-fb52-4d01-9405-7ddf8c551b2d	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
9878f364-f26a-4100-a7d8-e97c8432528f	7b1b6f41-9d9a-4f45-8cdf-a711ef15e6c8	4ffce1c8-9db7-49b9-892c-7e3eada42642
ba23f65b-bbfe-4b69-96da-c17ca11b0f1a	757dc41f-cee9-4f1f-8727-49eb17db3441	4ffce1c8-9db7-49b9-892c-7e3eada42642
2d14c5f5-97be-4c14-96cd-e7de02419d24	588bb7b4-fb52-4d01-9405-7ddf8c551b2d	24292c4d-9f2a-44d7-8b8b-ae789e71879d
4092e7ea-1951-45ec-926c-f86f6bf84a2e	7b1b6f41-9d9a-4f45-8cdf-a711ef15e6c8	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
f77f4098-3c37-4a6a-bcd0-38fdf9f7a471	757dc41f-cee9-4f1f-8727-49eb17db3441	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
30fef2f6-aa59-4bcc-b32b-d987b559b992	7b1b6f41-9d9a-4f45-8cdf-a711ef15e6c8	24292c4d-9f2a-44d7-8b8b-ae789e71879d
cc828df8-c187-4de0-87f7-ecb45820b0e9	757dc41f-cee9-4f1f-8727-49eb17db3441	24292c4d-9f2a-44d7-8b8b-ae789e71879d
75679522-e234-4dae-b1ef-3b9a3104b727	be27e5fc-dce1-45b2-903e-f241beac6d0b	4ffce1c8-9db7-49b9-892c-7e3eada42642
15371f6e-628f-4a46-8c31-bcfaeb052258	be27e5fc-dce1-45b2-903e-f241beac6d0b	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
9f009c2f-a49f-4b87-b990-63241a62737e	5ff7652e-62ca-4bdd-a391-fd9609ba8dc2	4ffce1c8-9db7-49b9-892c-7e3eada42642
699a1aa7-0187-4666-9771-1eb644abdc51	be27e5fc-dce1-45b2-903e-f241beac6d0b	24292c4d-9f2a-44d7-8b8b-ae789e71879d
e7c6c32a-07f0-4f45-9847-67f7cffd4032	db80bdf8-76f7-4d63-ab7c-223291be66e5	4ffce1c8-9db7-49b9-892c-7e3eada42642
87723439-76c2-4bd1-be47-2cbed5ef1a7f	5ff7652e-62ca-4bdd-a391-fd9609ba8dc2	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
a5779836-25a1-488d-ae9c-f88746d5165a	25b68cbf-ec43-4e20-9f3d-21d77698c397	4ffce1c8-9db7-49b9-892c-7e3eada42642
302bbb27-7b15-406a-a229-c66a4fd7d6c2	db80bdf8-76f7-4d63-ab7c-223291be66e5	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
b9c362e9-c90e-4cae-a4e9-a82415df7b16	5ff7652e-62ca-4bdd-a391-fd9609ba8dc2	24292c4d-9f2a-44d7-8b8b-ae789e71879d
6f1e012f-bd46-4e52-a951-28502d12d59d	25b68cbf-ec43-4e20-9f3d-21d77698c397	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
57a1370e-1143-47bd-bd3b-2a2508cdeab8	db80bdf8-76f7-4d63-ab7c-223291be66e5	24292c4d-9f2a-44d7-8b8b-ae789e71879d
3db04a1d-485f-46e2-9fb4-37e3a4d62199	25b68cbf-ec43-4e20-9f3d-21d77698c397	24292c4d-9f2a-44d7-8b8b-ae789e71879d
88614ae9-f4e0-43b9-8309-4c7983341564	b812f116-21c8-43ca-968f-2400d18fc242	6b955996-80da-45e7-8637-0c89cbfafd11
52bec326-43d3-4c34-b8a0-51646910b8cf	b812f116-21c8-43ca-968f-2400d18fc242	93af2a94-23e9-4af7-a319-e0191c3d8321
19567c32-aaf5-48bc-9bbe-f97a3612a29f	b812f116-21c8-43ca-968f-2400d18fc242	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
adfcdf4b-7865-49d0-89ae-72d60b159ee8	b812f116-21c8-43ca-968f-2400d18fc242	337b4748-a84b-401f-b1ed-5376019a639a
370a97ed-ee69-4730-ba2a-9ba8dc7bca8e	b812f116-21c8-43ca-968f-2400d18fc242	43331751-6482-40cd-bca3-09b75f2b9b24
5f031423-4095-4ba3-9288-4362227e053d	b812f116-21c8-43ca-968f-2400d18fc242	13dd9f54-368e-45ed-a6c4-abb9f982a877
380b895c-7b75-4ed5-b4f9-08fc0fccb93f	b812f116-21c8-43ca-968f-2400d18fc242	0461d1ed-4918-47be-b10f-6ddefaacb2f8
dd285245-8641-49bd-8b57-13e6b26d1a72	b812f116-21c8-43ca-968f-2400d18fc242	6618a025-b6a1-44ab-9a8d-70f54f8e810c
51869879-c82e-4a93-bd64-e16b95bdca53	b812f116-21c8-43ca-968f-2400d18fc242	af347f0d-3765-4021-93fe-f641fd68a195
108d65c0-082f-4947-a2fb-57a7e145057a	b812f116-21c8-43ca-968f-2400d18fc242	8c2b4018-f88d-4d46-aefe-d893778b16d1
2d4b41f1-7c68-44be-b59b-026aa34f8b05	b812f116-21c8-43ca-968f-2400d18fc242	fe5d0c2a-96b4-4a77-9f94-5000c110f8ad
194de4db-29a2-4521-9c4d-85df68ca936d	b812f116-21c8-43ca-968f-2400d18fc242	d1b7d2e9-f5d3-424b-a536-fd166f264181
a55008e0-0fd1-4e50-8530-f1598d79102c	b812f116-21c8-43ca-968f-2400d18fc242	d20a99f4-e67b-4400-b142-1e0da7b5dd96
c4a0af56-408f-4d06-a398-5af5878761d9	76bab0cf-2e78-450b-b6a7-1b766c57a4e9	0fde8e93-1163-47f9-940c-209755062ad5
66470b3f-54eb-4a6f-998e-6693ecd91df0	76bab0cf-2e78-450b-b6a7-1b766c57a4e9	6618a025-b6a1-44ab-9a8d-70f54f8e810c
b76166f0-85b0-4170-a62b-7472ddb95959	76bab0cf-2e78-450b-b6a7-1b766c57a4e9	4ffce1c8-9db7-49b9-892c-7e3eada42642
cd05c566-6882-46d6-9e7e-a9f9334657dc	76bab0cf-2e78-450b-b6a7-1b766c57a4e9	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
57487e1c-57fa-4693-bc3d-a4c693130aaf	76bab0cf-2e78-450b-b6a7-1b766c57a4e9	24292c4d-9f2a-44d7-8b8b-ae789e71879d
283b6267-8988-4cc4-86f5-d75783319e72	2a819d0b-bb36-47df-a6df-353788f38734	e87d8ae7-bfcf-4391-b16f-41e2a8eab449
e5061dbb-10ed-478a-b9c0-5183fc401556	2a819d0b-bb36-47df-a6df-353788f38734	8c2b4018-f88d-4d46-aefe-d893778b16d1
26f7f7d7-584d-4546-9831-b0cd98994a37	2a819d0b-bb36-47df-a6df-353788f38734	4ffce1c8-9db7-49b9-892c-7e3eada42642
08c4b6b5-ca1c-4e6b-acf4-240f095596d4	2a819d0b-bb36-47df-a6df-353788f38734	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
f64ec0b1-7b9b-4249-84e0-6e5e9c78c49e	2a819d0b-bb36-47df-a6df-353788f38734	7d190245-ea68-4be3-a0f7-b0aa79798b45
1c80854e-80ad-4560-b3c1-efe3b0d8ce76	2a819d0b-bb36-47df-a6df-353788f38734	8e04e29b-2569-45e9-8dae-4f442c630941
5e2249e0-60e4-411b-bac2-3e5cb2ef4f91	2a819d0b-bb36-47df-a6df-353788f38734	fe5d0c2a-96b4-4a77-9f94-5000c110f8ad
d012f62c-4c40-4bf2-9dbc-a3b1dee0fee0	2a819d0b-bb36-47df-a6df-353788f38734	13cc7fea-0f8b-4be2-bf3e-92aecf632fc7
e3bba505-ce9d-48cf-ac31-1afb454cbbc0	2a819d0b-bb36-47df-a6df-353788f38734	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
f5043fce-d96a-45f2-a3e9-925763d96db1	2a819d0b-bb36-47df-a6df-353788f38734	337b4748-a84b-401f-b1ed-5376019a639a
c3ddab08-e57f-4f79-8e6d-7348ec4b4444	2a819d0b-bb36-47df-a6df-353788f38734	93af2a94-23e9-4af7-a319-e0191c3d8321
9197de72-b7b1-412c-88e6-889cb989ce4c	2a819d0b-bb36-47df-a6df-353788f38734	6b955996-80da-45e7-8637-0c89cbfafd11
f31d7a48-964c-42f0-a3b5-76528a0dd473	2a819d0b-bb36-47df-a6df-353788f38734	c511f84c-1b5a-485b-aa12-93ffb3b27bce
25ee462b-366d-49a8-8a35-963614f84df8	2a819d0b-bb36-47df-a6df-353788f38734	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
6a31fa2b-1834-4b17-9146-4fcf3ac54db5	2a819d0b-bb36-47df-a6df-353788f38734	0fde8e93-1163-47f9-940c-209755062ad5
742d613d-f0fc-4fe6-92d1-a210cedc816a	2a819d0b-bb36-47df-a6df-353788f38734	0461d1ed-4918-47be-b10f-6ddefaacb2f8
95911b06-fba4-40ee-9c83-074667807818	2a819d0b-bb36-47df-a6df-353788f38734	13dd9f54-368e-45ed-a6c4-abb9f982a877
a1e70e45-f64e-4a6e-9894-7067d4db95ec	2a819d0b-bb36-47df-a6df-353788f38734	6618a025-b6a1-44ab-9a8d-70f54f8e810c
3f2f2449-e396-4ec5-b8e2-cb80c31488aa	2a819d0b-bb36-47df-a6df-353788f38734	d20a99f4-e67b-4400-b142-1e0da7b5dd96
5433a7ed-c750-4818-bdc3-e67515f29124	2a819d0b-bb36-47df-a6df-353788f38734	af347f0d-3765-4021-93fe-f641fd68a195
fa1c1676-49a2-4dae-8991-317fc44a1420	2a819d0b-bb36-47df-a6df-353788f38734	d1b7d2e9-f5d3-424b-a536-fd166f264181
76dd6a6c-14a0-4dbd-9f8f-2a33937e8102	2a819d0b-bb36-47df-a6df-353788f38734	692ba494-b705-40ed-a58f-91c7a22aeb0f
ad17a638-a293-4cb1-9f07-5690a893e37e	2a819d0b-bb36-47df-a6df-353788f38734	43331751-6482-40cd-bca3-09b75f2b9b24
328803fc-b1bb-452d-b8d5-9cde51a16d06	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	e87d8ae7-bfcf-4391-b16f-41e2a8eab449
2cfb545c-5ea6-4ab2-a5c5-aceede661b4e	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	af347f0d-3765-4021-93fe-f641fd68a195
dcaee6b8-9a4d-4441-b51a-fe2007aa201f	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	cedd38f6-0f08-4fc2-a204-9a47724c9a0c
2fcb2489-573d-48ac-b016-e15c5e9395c9	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	337b4748-a84b-401f-b1ed-5376019a639a
b34e14e4-9620-4380-b4f8-2ed4707cd90c	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	6618a025-b6a1-44ab-9a8d-70f54f8e810c
a15b4c69-a535-4503-ae0d-ac465500488d	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	93af2a94-23e9-4af7-a319-e0191c3d8321
da3c1754-c246-4ae1-8ad9-7731e86013b4	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	fe5d0c2a-96b4-4a77-9f94-5000c110f8ad
54c5521b-e8cb-490c-9a58-6fc15147c7b1	0f3fa8e9-9288-4ab5-aa39-804c0d242ba4	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
6b5c30a9-795b-4f84-a2c3-5d3729e5f939	14b91d0a-1712-4c46-bc74-706d36bba2f1	0fde8e93-1163-47f9-940c-209755062ad5
7a3c74e7-8972-49a6-ad34-2143c5c9bdb7	14b91d0a-1712-4c46-bc74-706d36bba2f1	6618a025-b6a1-44ab-9a8d-70f54f8e810c
24c01d2a-72fd-4937-bc5b-65a29b7b10d5	14b91d0a-1712-4c46-bc74-706d36bba2f1	4ffce1c8-9db7-49b9-892c-7e3eada42642
aaff3e29-7eb1-4fde-9a1c-ea68f4847be4	14b91d0a-1712-4c46-bc74-706d36bba2f1	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
1112872a-daa9-4fb8-bdc8-8ad1577cbb6c	14b91d0a-1712-4c46-bc74-706d36bba2f1	24292c4d-9f2a-44d7-8b8b-ae789e71879d
28e3e4ea-bfea-4973-8063-7179c5f07878	3752ebc3-21d0-4a16-bb70-a26488b8c0de	0fde8e93-1163-47f9-940c-209755062ad5
5f65fcf2-195a-4777-aac1-86684f2a5075	3752ebc3-21d0-4a16-bb70-a26488b8c0de	6618a025-b6a1-44ab-9a8d-70f54f8e810c
a47ac0a5-ca6f-4c65-b8c7-74a1755396c4	3752ebc3-21d0-4a16-bb70-a26488b8c0de	4ffce1c8-9db7-49b9-892c-7e3eada42642
ce2f2677-974f-4486-9f35-adc7475857bd	3752ebc3-21d0-4a16-bb70-a26488b8c0de	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
a705ab4d-98cd-4de4-a9fd-0a786070bd72	3752ebc3-21d0-4a16-bb70-a26488b8c0de	24292c4d-9f2a-44d7-8b8b-ae789e71879d
32d74a0e-5a19-49a5-bbbf-d12668bf0bff	c702f1a5-812d-44ef-bdc8-b04242ee4eca	0fde8e93-1163-47f9-940c-209755062ad5
fa32b006-38ce-4f95-bb3b-709c671de9a3	c702f1a5-812d-44ef-bdc8-b04242ee4eca	6618a025-b6a1-44ab-9a8d-70f54f8e810c
a209b440-f4ae-4f37-8ceb-b9edf2130623	c702f1a5-812d-44ef-bdc8-b04242ee4eca	4ffce1c8-9db7-49b9-892c-7e3eada42642
e28f3c42-6d25-441b-b622-36d01c5f4d5a	c702f1a5-812d-44ef-bdc8-b04242ee4eca	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
4240bb24-2f7b-4e10-9dbc-fb27c5a9e1c8	c702f1a5-812d-44ef-bdc8-b04242ee4eca	24292c4d-9f2a-44d7-8b8b-ae789e71879d
df3cece0-6ecb-46f4-9f56-57600b980ca8	c86e9d66-ad21-4393-af58-66badc4fffcc	0fde8e93-1163-47f9-940c-209755062ad5
5872e162-13a3-47c0-8b2d-304484134b9b	c86e9d66-ad21-4393-af58-66badc4fffcc	6618a025-b6a1-44ab-9a8d-70f54f8e810c
a44b4222-c095-438e-aab7-182d5960d0cf	c86e9d66-ad21-4393-af58-66badc4fffcc	4ffce1c8-9db7-49b9-892c-7e3eada42642
bcba3b6e-a96f-46c6-ba90-0de2d3112deb	c86e9d66-ad21-4393-af58-66badc4fffcc	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
8b9af5cf-4d28-43d2-8400-4aa32ea91122	c86e9d66-ad21-4393-af58-66badc4fffcc	24292c4d-9f2a-44d7-8b8b-ae789e71879d
13165e4e-3601-491f-bb2c-30f5c20e5aae	1a6bf844-e7ab-46c2-9ee2-49c27f7d4a30	0fde8e93-1163-47f9-940c-209755062ad5
85711ff8-ebfd-45cc-a1b2-49c6574dc7ee	1a6bf844-e7ab-46c2-9ee2-49c27f7d4a30	6618a025-b6a1-44ab-9a8d-70f54f8e810c
b176b3d3-bd12-408a-91b4-c743797137a0	1a6bf844-e7ab-46c2-9ee2-49c27f7d4a30	4ffce1c8-9db7-49b9-892c-7e3eada42642
9aa3dfe1-aa09-480d-ac47-f933fddb0eeb	1a6bf844-e7ab-46c2-9ee2-49c27f7d4a30	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
6fd0eaa5-aa3c-4c3f-b4a8-30c13d54fd50	1a6bf844-e7ab-46c2-9ee2-49c27f7d4a30	24292c4d-9f2a-44d7-8b8b-ae789e71879d
6e8f639f-11af-4c0e-a91f-8c3e667101d4	b4a13ca0-7b97-4ff9-9ee8-5996d4df4d77	0fde8e93-1163-47f9-940c-209755062ad5
a2eb921f-fbf2-438a-9a8a-5bddfd65aeaf	b4a13ca0-7b97-4ff9-9ee8-5996d4df4d77	6618a025-b6a1-44ab-9a8d-70f54f8e810c
225c9bcc-c8bd-459f-84b2-a9328c5eb2b7	b4a13ca0-7b97-4ff9-9ee8-5996d4df4d77	4ffce1c8-9db7-49b9-892c-7e3eada42642
7b72f12e-99b9-4d7d-9cfc-bfd03535a3dc	b4a13ca0-7b97-4ff9-9ee8-5996d4df4d77	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
10cf8269-b26c-415e-bc28-27d81dad9752	a30b4d3e-6c3b-4d28-b1f7-e42e07c7cb7f	0fde8e93-1163-47f9-940c-209755062ad5
d0a7d6bb-7148-4856-97a9-ece230055237	b4a13ca0-7b97-4ff9-9ee8-5996d4df4d77	24292c4d-9f2a-44d7-8b8b-ae789e71879d
5f5c8c72-7d41-4257-8d7d-b9a61bc4c56d	a30b4d3e-6c3b-4d28-b1f7-e42e07c7cb7f	6618a025-b6a1-44ab-9a8d-70f54f8e810c
139df44d-05da-4539-a1e7-3112dbe0d7a8	a30b4d3e-6c3b-4d28-b1f7-e42e07c7cb7f	4ffce1c8-9db7-49b9-892c-7e3eada42642
74926dac-fa90-4c41-91f8-ef84e32edade	a30b4d3e-6c3b-4d28-b1f7-e42e07c7cb7f	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
466f54a1-58a9-4442-ac54-5dcabf80d5dc	a30b4d3e-6c3b-4d28-b1f7-e42e07c7cb7f	24292c4d-9f2a-44d7-8b8b-ae789e71879d
fa32508e-ffb5-46c0-ba3d-245860d2c957	1203f940-ac3f-4315-bb84-1f04eeb6b6ce	0fde8e93-1163-47f9-940c-209755062ad5
428954c4-9310-4993-993d-5fa5bbb3ccb9	9a1005aa-63b0-4628-921a-ac7a80ffbf69	0fde8e93-1163-47f9-940c-209755062ad5
5b524469-fceb-4353-a3cf-90f16f59da82	1203f940-ac3f-4315-bb84-1f04eeb6b6ce	6618a025-b6a1-44ab-9a8d-70f54f8e810c
09fd5f93-f67a-424b-9554-913ac7ebed17	9a1005aa-63b0-4628-921a-ac7a80ffbf69	6618a025-b6a1-44ab-9a8d-70f54f8e810c
6b85ea82-f23f-4a01-8891-126d0be55dd5	1203f940-ac3f-4315-bb84-1f04eeb6b6ce	4ffce1c8-9db7-49b9-892c-7e3eada42642
6e08ce6f-a732-4e67-ada0-0c3c3647d198	9a1005aa-63b0-4628-921a-ac7a80ffbf69	4ffce1c8-9db7-49b9-892c-7e3eada42642
6129a475-aeea-4810-98b9-0503bea525bb	1203f940-ac3f-4315-bb84-1f04eeb6b6ce	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
7598f957-c84c-4b97-a804-75724eaa1372	9a1005aa-63b0-4628-921a-ac7a80ffbf69	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
1ad01871-5bc3-4764-9924-df3f74c494e9	1203f940-ac3f-4315-bb84-1f04eeb6b6ce	24292c4d-9f2a-44d7-8b8b-ae789e71879d
5a76be24-0b6b-491b-9e17-da2449eb6fbe	9a1005aa-63b0-4628-921a-ac7a80ffbf69	24292c4d-9f2a-44d7-8b8b-ae789e71879d
b03bd1b9-5283-4584-84ed-d3b22d5af597	6e3f17f5-c283-4454-8e1c-45e4eae11cf4	0fde8e93-1163-47f9-940c-209755062ad5
0c1184e1-600b-4ba3-b7d8-595cc60d2135	6e3f17f5-c283-4454-8e1c-45e4eae11cf4	6618a025-b6a1-44ab-9a8d-70f54f8e810c
67854d8e-5557-46ac-8847-06c116307ce6	6e3f17f5-c283-4454-8e1c-45e4eae11cf4	4ffce1c8-9db7-49b9-892c-7e3eada42642
091c543d-b5ca-4058-afc4-f9735b49325f	6e3f17f5-c283-4454-8e1c-45e4eae11cf4	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
97b159ff-c2e4-460d-90c0-5a7804cc29e3	bc402568-2c56-4b53-8d18-b3d181b96765	43331751-6482-40cd-bca3-09b75f2b9b24
f47d42b8-a593-4296-bdb3-3eecf6044cce	bc402568-2c56-4b53-8d18-b3d181b96765	0fde8e93-1163-47f9-940c-209755062ad5
39c0bf2c-b8d3-4b3d-880a-bf1603c88426	bc402568-2c56-4b53-8d18-b3d181b96765	6618a025-b6a1-44ab-9a8d-70f54f8e810c
52aefdcb-10b0-482a-b37a-619ff6af0e1c	bc402568-2c56-4b53-8d18-b3d181b96765	4ffce1c8-9db7-49b9-892c-7e3eada42642
8df3f012-bbaa-463c-927c-a773b2207762	bc402568-2c56-4b53-8d18-b3d181b96765	74624fe2-4f5d-4e82-ba1b-6c1e79495d96
17d7d662-f413-4e01-bd32-ce1dcc63cbaf	857f03be-39c2-4f01-8785-6b8869601aff	c511f84c-1b5a-485b-aa12-93ffb3b27bce
97a4b80b-2c20-47b2-9c32-a9ef1a87af8f	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	24292c4d-9f2a-44d7-8b8b-ae789e71879d
0e19f229-0644-4dca-bfd0-21d7eefd4e86	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	13dd9f54-368e-45ed-a6c4-abb9f982a877
4de7f229-4a92-4855-988d-208a8b4d2d21	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	d20a99f4-e67b-4400-b142-1e0da7b5dd96
c9b7c275-8462-4ac9-9921-3c06a9869694	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
46326bbf-bbaa-47f2-9bbd-bb6400b43d3c	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	c511f84c-1b5a-485b-aa12-93ffb3b27bce
69ab5cc6-c605-4efd-b17c-be6c56f82300	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	6b955996-80da-45e7-8637-0c89cbfafd11
a9bab31b-3221-4bac-b85e-04f5ec6d5433	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	13cc7fea-0f8b-4be2-bf3e-92aecf632fc7
e991b586-0357-4c12-9c5e-c3198172f0cf	58d47581-b629-4d1b-b4a2-1a320b6a5bd9	8c2b4018-f88d-4d46-aefe-d893778b16d1
f6c74327-58c0-4d2b-9406-7c40f4d07f78	02727e5a-0ce3-460b-8093-ff2b340950c7	24292c4d-9f2a-44d7-8b8b-ae789e71879d
15ffb38e-18e3-4616-acfb-3598bd2b16aa	02727e5a-0ce3-460b-8093-ff2b340950c7	13dd9f54-368e-45ed-a6c4-abb9f982a877
78fa0105-dab0-496f-a1f0-b94de27d0965	02727e5a-0ce3-460b-8093-ff2b340950c7	d20a99f4-e67b-4400-b142-1e0da7b5dd96
785205b3-f857-4679-8f72-e8a58359e6d6	02727e5a-0ce3-460b-8093-ff2b340950c7	eecd27e1-7f29-41b1-ac7e-c1c7699695cf
d618f921-7459-4d7f-ab05-0cdeef6b933c	02727e5a-0ce3-460b-8093-ff2b340950c7	c511f84c-1b5a-485b-aa12-93ffb3b27bce
a920ed36-5926-4ab8-b97a-4e3f34c29544	02727e5a-0ce3-460b-8093-ff2b340950c7	6b955996-80da-45e7-8637-0c89cbfafd11
52c49a44-d348-4d3f-8e16-ec9fc25894ae	02727e5a-0ce3-460b-8093-ff2b340950c7	13cc7fea-0f8b-4be2-bf3e-92aecf632fc7
6a5894ad-760c-4392-8b85-ef3fa1871d47	02727e5a-0ce3-460b-8093-ff2b340950c7	8c2b4018-f88d-4d46-aefe-d893778b16d1
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, "storeId", "categoryId", name, price, "isFeatured", "isArchived", "sizeId", "colorId", "imageUrls", "createdAt", "updatedAt") FROM stdin;
c511f84c-1b5a-485b-aa12-93ffb3b27bce	573ae13b-576a-48e4-9a04-d8d029024ac6	12e81495-2d6f-418d-a85a-37065588b07c	Kenneth Cole	24.99	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	325f2ba2-c72b-4cea-b5ef-efe63858b664	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995817/jec5qioqq1zzm0d3bquq.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995826/e4hyoze15tgyhqmp259s.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995839/srzo9g9wc7ssbkbt4rrc.jpg}	2023-09-18 00:11:06.202	2023-09-18 00:11:06.111
6b955996-80da-45e7-8637-0c89cbfafd11	573ae13b-576a-48e4-9a04-d8d029024ac6	77518b62-9efd-4e94-ab54-4d6dc73122f8	Ray-Ban	149.99	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	39c93453-db90-4ebe-97a9-2a8becdde78e	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995971/x8pco5ytajzzfxigsqak.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995980/qpsfbs1yoew2iug26qyk.jpg}	2023-09-18 00:13:31.865	2023-09-18 00:13:31.832
80849866-5ccf-4dbc-aa19-6b6003137daa	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	product one	9.99	t	t	26ed819f-20cc-4d80-8e8a-856bd76f6186	88c3e3bb-cf41-4f3e-87f3-19a7060e5b00	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694829592/tq8p3jx998g3p9fpj3ns.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694834957/z3kstx33achlqexqc4pp.jpg}	2023-09-16 01:59:14.752	2023-09-16 23:30:25.5
24292c4d-9f2a-44d7-8b8b-ae789e71879d	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Black	79.99	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	aa398c70-2ec6-400f-b7d2-39143bc2f302	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915672/ohazqp0cze3fakstc8jg.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915799/jtalxi7kx4lhl7fxgta4.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915808/zqx1b6dwhpclto8vn9yh.jpg}	2023-09-17 01:54:03.935	2023-09-17 01:57:32.183
692ba494-b705-40ed-a58f-91c7a22aeb0f	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Yellow	89.99	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	130e03fa-9300-4191-a95b-d89a06660a55	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994802/d0gjxhdmhb6dnw9gs9hi.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994811/pvzoyhx0hln7wn91st6j.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994822/nkmzjq0sfpdvxzcen1fd.jpg}	2023-09-17 23:53:07.389	2023-09-17 23:53:47.028
0461d1ed-4918-47be-b10f-6ddefaacb2f8	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Gray	104.99	t	f	e094f37a-0293-497e-ae84-1af7e395a32c	ca35ef23-6174-4c1c-826d-fcdcee8e38a5	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994929/atdrfyanmghrwwdzafhx.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994940/jud93eugmzrx9dmssens.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994952/s58hu8eebx0zesrzhzwj.jpg}	2023-09-17 23:56:21.143	2023-09-17 23:56:21.11
13dd9f54-368e-45ed-a6c4-abb9f982a877	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Lime	84.99	t	f	e094f37a-0293-497e-ae84-1af7e395a32c	88c3e3bb-cf41-4f3e-87f3-19a7060e5b00	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995053/mzx17nruvx3gc1igmizt.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995062/ner2zepqtmctxlnjsddu.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995069/wcko1tkgcmygrg3tjhfa.jpg}	2023-09-17 23:58:03.953	2023-09-17 23:58:03.858
d20a99f4-e67b-4400-b142-1e0da7b5dd96	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Red	109.99	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	90ddae27-99cd-4341-97f3-10d72b00f6de	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995137/p5q2amt0hkbp2jtthnki.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995147/owyfkni4unawlhbyspaf.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995158/mgj3jvffu9lqq5ulqxkk.jpg}	2023-09-17 23:59:24.164	2023-09-17 23:59:24.13
d1b7d2e9-f5d3-424b-a536-fd166f264181	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	COOFANDY	39.99	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	325f2ba2-c72b-4cea-b5ef-efe63858b664	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995256/mej4haxf13gdndazxvuh.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995269/ods3rwltrcohrpcvzojl.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995277/ox92jgh170rsi9vm1rps.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995288/tjxkbxumbpit4vla0cum.jpg}	2023-09-18 00:01:55.356	2023-09-18 00:01:55.264
eecd27e1-7f29-41b1-ac7e-c1c7699695cf	573ae13b-576a-48e4-9a04-d8d029024ac6	12e81495-2d6f-418d-a85a-37065588b07c	Clarks Men's Black	45	t	f	03301190-06a0-4481-a8ae-a6c1f902cbdd	aa398c70-2ec6-400f-b7d2-39143bc2f302	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995575/snjm1hhixhf8fgyrfnkh.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995585/xhzi06w3nekkeyobko2c.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995593/lwstnfpugoy8udiavses.jpg}	2023-09-18 00:07:02.513	2023-09-18 00:07:02.419
13cc7fea-0f8b-4be2-bf3e-92aecf632fc7	573ae13b-576a-48e4-9a04-d8d029024ac6	931edf72-f5b3-4d47-80fe-f4d3261bc991	Kihatwin 	11	t	f	e094f37a-0293-497e-ae84-1af7e395a32c	325f2ba2-c72b-4cea-b5ef-efe63858b664	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996338/i6runqrlpq1kfebgpuox.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996342/kd6brz9ybj404ayszrog.jpg}	2023-09-18 00:19:20.334	2023-09-18 00:19:20.3
8e04e29b-2569-45e9-8dae-4f442c630941	573ae13b-576a-48e4-9a04-d8d029024ac6	931edf72-f5b3-4d47-80fe-f4d3261bc991	HISDERN Paisley 	25	t	f	03301190-06a0-4481-a8ae-a6c1f902cbdd	e804254a-5a96-458e-a41c-195247f5d776	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996489/enszhmjsz9udtsjhlxgw.jpg}	2023-09-18 00:21:57.387	2023-09-18 00:21:57.353
7d190245-ea68-4be3-a0f7-b0aa79798b45	573ae13b-576a-48e4-9a04-d8d029024ac6	931edf72-f5b3-4d47-80fe-f4d3261bc991	GUSLESON 	12	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	88c3e3bb-cf41-4f3e-87f3-19a7060e5b00	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996398/wxvqmhtkxlztmszgzvt4.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996402/h2hytgix8khx9yvcparg.jpg}	2023-09-18 00:20:15.491	2023-09-18 00:20:15.457
8c2b4018-f88d-4d46-aefe-d893778b16d1	573ae13b-576a-48e4-9a04-d8d029024ac6	7cd2b9ac-cdca-4a4f-a955-70a5da6542b4	OLEVS 	98	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	88c3e3bb-cf41-4f3e-87f3-19a7060e5b00	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996882/l51j4zyyl9fujxebtgtx.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996886/d3qrqi9eoy2oo2wn9ydp.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996891/slthrkrbpvwwksonue37.jpg}	2023-09-18 00:28:29.775	2023-09-18 00:28:29.741
337b4748-a84b-401f-b1ed-5376019a639a	573ae13b-576a-48e4-9a04-d8d029024ac6	77518b62-9efd-4e94-ab54-4d6dc73122f8	EYLRIM 	50	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	aa398c70-2ec6-400f-b7d2-39143bc2f302	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996101/qrceewcop3e88dhkbkyt.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996109/nca6pjllwksjpdckij3n.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996118/boelunr6q1hxod4zeu0a.jpg}	2023-09-18 00:15:40.915	2023-10-01 23:27:18.439
43331751-6482-40cd-bca3-09b75f2b9b24	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Brown	84.55	t	f	03301190-06a0-4481-a8ae-a6c1f902cbdd	39c93453-db90-4ebe-97a9-2a8becdde78e	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915976/nvktlzanydbsoctmbijj.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915982/lrpum4vp5uylsweizuma.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694915987/x0idpxs1xinwzgqorz3o.jpg}	2023-09-17 01:59:14.887	2023-10-01 23:31:51.623
0fde8e93-1163-47f9-940c-209755062ad5	573ae13b-576a-48e4-9a04-d8d029024ac6	12e81495-2d6f-418d-a85a-37065588b07c	Clarks Men's 	49.99	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	39c93453-db90-4ebe-97a9-2a8becdde78e	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995730/eeclcra6irrmzsvqjtxt.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995739/clkq5bfwxqbhftnieooj.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995748/jmrdayfomehtla751mro.jpg}	2023-09-18 00:09:12.187	2023-10-01 23:32:37.141
93af2a94-23e9-4af7-a319-e0191c3d8321	573ae13b-576a-48e4-9a04-d8d029024ac6	77518b62-9efd-4e94-ab54-4d6dc73122f8	ShadyVEU 	15	t	f	03301190-06a0-4481-a8ae-a6c1f902cbdd	aa398c70-2ec6-400f-b7d2-39143bc2f302	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996031/nrlmvnx7szic4vgjs6ue.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996039/om2igazazfh3u46jgba9.jpg}	2023-09-18 00:14:17.204	2023-10-01 23:32:56.937
e87d8ae7-bfcf-4391-b16f-41e2a8eab449	573ae13b-576a-48e4-9a04-d8d029024ac6	7cd2b9ac-cdca-4a4f-a955-70a5da6542b4	Invicta 	84	t	f	26ed819f-20cc-4d80-8e8a-856bd76f6186	327da30f-a579-4b89-a088-8c79b5462018	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996830/evaf1u7w64hbi4kviplx.jpg}	2023-09-18 00:27:28.85	2023-10-01 23:25:22.375
74624fe2-4f5d-4e82-ba1b-6c1e79495d96	573ae13b-576a-48e4-9a04-d8d029024ac6	7cd2b9ac-cdca-4a4f-a955-70a5da6542b4	Khaki	559	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	88c3e3bb-cf41-4f3e-87f3-19a7060e5b00	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996799/ewb8qicrj6t8bpqxzsic.jpg}	2023-09-18 00:26:58.946	2023-10-01 23:25:33.976
4ffce1c8-9db7-49b9-892c-7e3eada42642	573ae13b-576a-48e4-9a04-d8d029024ac6	7cd2b9ac-cdca-4a4f-a955-70a5da6542b4	Luxury 	40	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	aa398c70-2ec6-400f-b7d2-39143bc2f302	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996720/yvbih62lcy7k3qofsuom.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996728/qc86ivkxy2ux3j3nyejq.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996732/m9gp8fqvrksu5thk0arf.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996737/wwspc1abybqyjjnreinx.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996748/ggrvm4mjd04awacwxgvf.jpg}	2023-09-18 00:26:25.088	2023-10-01 23:25:42.719
fe5d0c2a-96b4-4a77-9f94-5000c110f8ad	573ae13b-576a-48e4-9a04-d8d029024ac6	931edf72-f5b3-4d47-80fe-f4d3261bc991	Secdtie	12	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	90ddae27-99cd-4341-97f3-10d72b00f6de	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996287/qvyuloo6wxzwls1hrea9.jpg}	2023-09-18 00:18:35.353	2023-10-01 23:26:41.922
cedd38f6-0f08-4fc2-a204-9a47724c9a0c	573ae13b-576a-48e4-9a04-d8d029024ac6	77518b62-9efd-4e94-ab54-4d6dc73122f8	WearMe	15	t	f	31109f46-64b8-4864-9f29-83ba3331d4d2	aa398c70-2ec6-400f-b7d2-39143bc2f302	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996160/uaebdlzhtwk5wlwmhpfy.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694996168/efsln3vv4wkzgv3p77z9.jpg}	2023-09-18 00:16:27.358	2023-10-01 23:27:05.752
6618a025-b6a1-44ab-9a8d-70f54f8e810c	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	COOFANDY White	89	t	f	0b76fdb5-c30a-4df2-b074-272a4c42461e	e804254a-5a96-458e-a41c-195247f5d776	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995419/ckhih3m7wci9gqwqlfxr.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995427/u0qtsl6qqgneb1jhjb4v.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995437/tazs1efr5lkovwfpxe9z.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694995451/ezqckrftn8vydbazdhwi.jpg}	2023-09-18 00:04:36.711	2023-10-01 23:29:05.415
af347f0d-3765-4021-93fe-f641fd68a195	573ae13b-576a-48e4-9a04-d8d029024ac6	5d07af62-f5bf-4d70-9263-cbfabc4773a5	WEEN CHARM Blue	99.99	t	f	e094f37a-0293-497e-ae84-1af7e395a32c	325f2ba2-c72b-4cea-b5ef-efe63858b664	{https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994857/a9mo906kdwku6uzegbqi.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994866/t166ife3vq5rzcbw2105.jpg,https://res.cloudinary.com/dqe9ksk0p/image/upload/v1694994874/fdputmjhznpe1prphhvn.jpg}	2023-09-17 23:54:56.023	2023-10-01 23:33:14.335
\.


--
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Size" (id, "storeId", name, value, "createdAt", "updatedAt") FROM stdin;
26ed819f-20cc-4d80-8e8a-856bd76f6186	573ae13b-576a-48e4-9a04-d8d029024ac6	XS	10	2023-09-16 01:58:11.164	2023-09-17 01:49:04.691
e094f37a-0293-497e-ae84-1af7e395a32c	573ae13b-576a-48e4-9a04-d8d029024ac6	S	15	2023-09-17 01:49:12.597	2023-09-17 01:49:12.504
31109f46-64b8-4864-9f29-83ba3331d4d2	573ae13b-576a-48e4-9a04-d8d029024ac6	MD	20	2023-09-17 01:49:22.299	2023-09-17 01:49:22.205
0b76fdb5-c30a-4df2-b074-272a4c42461e	573ae13b-576a-48e4-9a04-d8d029024ac6	L	30	2023-09-17 01:49:32.687	2023-09-17 01:49:32.655
03301190-06a0-4481-a8ae-a6c1f902cbdd	573ae13b-576a-48e4-9a04-d8d029024ac6	XL	35	2023-09-17 01:49:42.407	2023-09-17 01:49:42.375
\.


--
-- Data for Name: Store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Store" (id, name, "userId", "createdAt", "updatedAt") FROM stdin;
573ae13b-576a-48e4-9a04-d8d029024ac6	Suits	6b1a6846-47a3-4cf2-b897-ef071f6dc483	2023-09-16 01:46:24.168	2023-09-17 01:40:08.985
c3b0a7ac-31ec-4305-9960-e7fc34a4bac2	S2	309a6ff7-e538-4843-bb7b-dfc1a6643261	2023-10-02 00:22:43.718	2023-10-01 21:22:43.718
\.


--
-- Data for Name: Test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Test" (id, price) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, username, image, "emailVerified", "joinedAt") FROM stdin;
309a6ff7-e538-4843-bb7b-dfc1a6643261	Mohamed Amer	mohamedtahaaamer@gmail.com	VTsBVtBePe	https://lh3.googleusercontent.com/a/ACg8ocLiQ53ht7gS1br9CWILjmn6fIftBCEBqiJhCzNGO379NQ=s96-c	\N	2023-10-02 00:18:15.731
6b1a6846-47a3-4cf2-b897-ef071f6dc483	o mohamed taha	thm7722110@gmail.com	k8mR3bNwAh	https://lh3.googleusercontent.com/a/ACg8ocKxqsC5_qkXQVT7VxOm2qbZSpLIltqcWMc1L38eq9Ne=s96-c	\N	2023-09-16 00:02:12.425
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Billboard Billboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Billboard"
    ADD CONSTRAINT "Billboard_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Color Color_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Size Size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "Size_pkey" PRIMARY KEY (id);


--
-- Name: Store Store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Store"
    ADD CONSTRAINT "Store_pkey" PRIMARY KEY (id);


--
-- Name: Test Test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Billboard Billboard_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Billboard"
    ADD CONSTRAINT "Billboard_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public."Store"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Category Category_billboardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_billboardId_fkey" FOREIGN KEY ("billboardId") REFERENCES public."Billboard"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Category Category_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public."Store"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Color Color_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public."Store"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public."Store"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_colorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES public."Color"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public."Size"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public."Store"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Size Size_storeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "Size_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES public."Store"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Store Store_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Store"
    ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

