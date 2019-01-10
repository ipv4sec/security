
CREATE TABLE `user` (
  `id` int(12) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '这个人很懒，什么都没有写…' COMMENT '描述',
  `role_id` int(12) NOT NULL DEFAULT '1' COMMENT '角色主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;