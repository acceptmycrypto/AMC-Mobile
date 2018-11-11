INSERT INTO crypto_comments (user_id, crypto_id, body) VALUES 
(1, 1, "comment1, something about something"),
(2, 1, "comment2, of course"),
(3, 1, "comment3, i agree"),
(4, 1, "comment4, something else about something else"),
(5, 1, "comment5, too bad"),
(6, 1, "comment6, i disagree");

INSERT INTO parents_children (comment_parent_id, comment_child_id) VALUES 
(1, 2),
(1, 3),
(4, 5),
(4, 6);