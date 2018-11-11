INSERT INTO users (username, first_name, last_name, phone_number, email, password, email_verification_token) VALUES
("ym","yanan","meng","1234567890","ym@ym.com","ym", uuid()),
("ak","avanika","k","1234567890","ak@ak.com","ak", uuid()),
("jn","jason","neitro","1234567890","jn@jn.com","jn", uuid()),
("sn","simon","nguyen","1234567890","sn@sn.com","sn", uuid()),
("hf","hooman","f","1234567890","hf@hf.com","hf", uuid()),
("pk","pavan","katapali","1234567890","pk@pk.com","pk", uuid());


INSERT INTO users_profiles (user_id, bio, user_location, photo) VALUES
(1,"Hi! I am Yanan","San Francisco", "fa-user-secret"),
(2,"Hey I'm Avanika","San Francisco", "fa-user-circle"),
(3,"Hello I'm Jason!","San Francisco", "fa-user-astronaut"),
(4,"Hey it's Simon","San Francisco", "fa-user-tie"),
(5,"This is Hooman","San Francisco", "fa-user"),
(6,"Hey I am Pavan!","San Francisco", "fa-user-astronaut");

INSERT INTO users_cryptos (user_id, crypto_id) VALUES
(1,2),
(1,6),
(1,7),
(2,1),
(2,8),
(2,6),
(3,4),
(3,3),
(4,1),
(4,2),
(4,3),
(4,6),
(5,8),
(5,5),
(5,4),
(6,7),
(6,1),
(6,8),
(6,5),
(6,4),
(6,3);


INSERT INTO users_purchases (user_id, deal_id, crypto_id, amount, txn_id, address, confirms_needed, timeout, qrcode_url, payment_received, permission, date_purchased) VALUES
(1, 1, 6, 0.076, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-01 01:07:19"),
(2, 1, 6, 0.076, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-01 15:08:09"),
(3, 1, 4, 2218.763, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 4, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-03 12:38:29"),
(4, 1, 2, 0.0015, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-04 06:18:20"),
(5, 1, 8, 0.0969, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-05 05:24:01"),
(1, 2, 2, 0.011, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 5, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-05 10:55:10"),
(5, 2, 4, 15651.87, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "community", "2018-10-07 09:40:30"),
(4, 2, 2, 0.0109, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-09 16:22:05"),
(6, 2, 7, 1.3298, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 4, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-10 02:12:24"),
(6, 3, 5, 27.8323, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-10 07:06:09"),
(3, 3, 4, 59373.11, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 1, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-14 09:07:29"),
(2, 3, 6, 1.3103, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-15 20:38:20"),
(5, 3, 5, 27.9459, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-15 22:14:29"),
(1, 4, 7, 0.309, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 4, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-15 16:05:29"),
(6, 4, 7, 0.308, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-17 05:22:29"),
(1, 4, 3, 0.1069, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 5, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true, "friends", "2018-10-18 10:38:29"),
(4, 4, 2, 0.0025, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 5, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", false, "private", "2018-10-19 12:06:33"),
(5, 4, 4, 3635.976, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", false, "private", "2018-10-20 10:40:00"),
(3, 4, 3, 0.1266, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", false, "private", "2018-10-24 12:38:29");


INSERT INTO users_matched_friends (user_id, matched_friend_id, user_accepted, both_accepted) VALUES
(1, 2, 1, 1),
(2, 1, 1, 1),
(1, 4, 1, 0),
(4, 1, 0, 0),
(1, 6, 0, 0),
(6, 1, 0, 0),
(1, 3, 1, 1),
(3, 1, 1, 1);


INSERT INTO users_cryptos(user_id, crypto_id, crypto_address) VALUES
(1,1, "15wFc6QAAJqRnwAdtaYMydGJHFrQrDZkPA"),
(1,3, "XshzoU2HrRdki4T78YV9vpeXAVuPZnnBaF");
