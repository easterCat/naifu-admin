// {
//   "data": {
//       "user": {
//           "id": "31",
//           "username": "admin",
//           "email": "admin@qq.com",
//           "password_hash": "$pbkdf2-sha256$29000$TKkVgvCeM0boHeNcK6WU8g$32TQqUVpUWDJNBl5xOsVcrlqjxjM9MkNoXElZycV07I",
//           "nickname": "\u8d85\u7ea7\u7ba1\u7406\u5458",
//           "collected": "",
//           "create_time": "2023-01-07 09:26:36",
//           "update_time": "2023-01-07 09:26:36",
//           "role_id": "4"
//       },
//       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MzA3MzYzMywianRpIjoiNmUxZjk2MjMtNjc0MS00OGU0LWFkNWYtNjEwNzJmZWUxOTY4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjczMDczNjMzLCJleHAiOjE2NzMxNjAwMzN9.hDUMva8y3-ns6T7GWGAIunlZSN2OkzcBIzDvMPjKGIY",
//       "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MzA3MzYzMywianRpIjoiZDg4MzIxZjMtNmM2Zi00MjA1LTgzZGMtNGMzZmVjN2RmMTQwIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOiJhZG1pbiIsIm5iZiI6MTY3MzA3MzYzMywiZXhwIjoxNjczOTM3NjMzfQ.uhBTWOvkC0iDpJnvJwKuSnrWv2H0_wjk3fdlfovHQ64"
//   },
//   "msg": "Logged in as admin",
//   "code": 200
// }

export interface UserInfoModel {
    user: any;
    access_token: string;
    refresh_token: string;
}

export interface Users {
    items: any;
}
