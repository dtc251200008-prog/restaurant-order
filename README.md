# Restaurant Order - Docker Monitoring System

## 1. Giới thiệu dự án

Dự án Restaurant Order triển khai ứng dụng đặt món nhà hàng bằng Docker Compose. Hệ thống tích hợp cơ sở dữ liệu, công cụ quản lý cơ sở dữ liệu, reverse proxy, giám sát dịch vụ và thu thập log.

Mục tiêu của dự án:
- Triển khai ứng dụng và cơ sở dữ liệu bằng Docker.
- Sử dụng Nginx làm reverse proxy.
- Sử dụng Prometheus và Grafana để giám sát hệ thống.
- Sử dụng Loki và Promtail để thu thập và truy vấn log.
- Quản lý mã nguồn bằng Git và GitHub.

## 2. Công nghệ sử dụng

| Công nghệ | Chức năng |
|---|---|
| Docker | Đóng gói và chạy các dịch vụ trong container |
| Docker Compose | Quản lý nhiều dịch vụ |
| Node.js | Chạy ứng dụng web |
| PostgreSQL | Lưu trữ dữ liệu |
| pgAdmin | Quản lý cơ sở dữ liệu PostgreSQL |
| Nginx | Reverse proxy cho ứng dụng |
| Prometheus | Thu thập và truy vấn số liệu giám sát |
| Grafana | Hiển thị dashboard giám sát |
| Loki | Lưu trữ và truy vấn log |
| Promtail | Thu thập log và gửi đến Loki |
| Git/GitHub | Quản lý phiên bản và lưu trữ mã nguồn |

## 3. Cấu trúc thư mục

```text
restaurant-order/
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── grafana/
├── logs/
│   └── test.log
├── nginx/
│   └── default.conf
├── prometheus/
├── promtail/
│   └── promtail-config.yml
├── docker-compose.yml
├── init.sql
└── README.md
```

Các thư mục cấu hình như `grafana/` và `prometheus/` chứa những file phục vụ việc cấu hình giám sát. Cấu hình cụ thể phụ thuộc vào nội dung các file trong dự án.

## 4. Yêu cầu trước khi chạy

Máy tính cần có:
- Windows 10/11 hoặc hệ điều hành hỗ trợ Docker.
- Docker Desktop đã được cài đặt và khởi động thành công.
- Git nếu muốn quản lý mã nguồn bằng Git.
- Trình duyệt web để truy cập các dịch vụ.

Kiểm tra Docker bằng PowerShell hoặc terminal trong VS Code:

```powershell
docker --version
docker compose version
```

Nếu hai lệnh trả về phiên bản, hãy tiếp tục.

Kiểm tra Docker Engine:

```powershell
docker info
```

Nếu lệnh báo không kết nối được Docker Engine, hãy mở Docker Desktop, chờ Docker khởi động hoàn tất rồi thử lại.

## 5. Cách tải mã nguồn

Nếu đã có mã nguồn trên máy, mở terminal tại thư mục dự án `restaurant-order`.

Nếu muốn tải dự án từ GitHub, chạy:

```powershell
git clone https://github.com/TEN_TAI_KHOAN/restaurant-order.git
cd restaurant-order
```

Thay `TEN_TAI_KHOAN` bằng tên tài khoản GitHub thực tế.

## 6. Cấu hình trước khi chạy

Mở file `docker-compose.yml` và kiểm tra:
- Tên các dịch vụ.
- Các cổng được ánh xạ ra máy tính.
- Biến môi trường của PostgreSQL và pgAdmin.
- Mạng giữa các dịch vụ.
- Các đường dẫn mount cấu hình và log.
- Các file cấu hình Prometheus, Grafana, Nginx, Promtail.

Nếu dự án yêu cầu mật khẩu hoặc biến môi trường, hãy cấu hình theo các giá trị mà ứng dụng và Docker Compose đang sử dụng. Không đăng tải mật khẩu thật lên GitHub.

## 7. Khởi chạy hệ thống

### Bước 1: Mở terminal tại thư mục dự án

Trong VS Code, mở thư mục `restaurant-order`, sau đó chọn Terminal → New Terminal.

Kiểm tra vị trí hiện tại:

```powershell
Get-Location
```

Đảm bảo terminal đang ở thư mục chứa file `docker-compose.yml`.

### Bước 2: Kiểm tra cấu hình Docker Compose

Chạy:

```powershell
docker compose config
```

Nếu cấu hình hợp lệ, Docker Compose sẽ hiển thị cấu hình đã được xử lý. Nếu có lỗi, hãy sửa lỗi được thông báo trước khi tiếp tục.

### Bước 3: Khởi chạy các dịch vụ

Chạy:

```powershell
docker compose up -d --build
```

Lệnh này yêu cầu Docker Compose build các image cần build và khởi chạy các dịch vụ ở chế độ nền.

Lần chạy đầu tiên có thể mất thời gian để tải image và cài đặt các thành phần cần thiết.

### Bước 4: Kiểm tra trạng thái

Chạy:

```powershell
docker compose ps
```

Kiểm tra các dịch vụ đã được tạo và đang chạy. Nếu dịch vụ nào thoát hoặc khởi động thất bại, xem log bằng:

```powershell
docker compose logs --tail=100
```

Xem log riêng của một dịch vụ:

```powershell
docker compose logs --tail=100 app
```

Thay `app` bằng tên dịch vụ thực tế cần kiểm tra.

### Bước 5: Theo dõi log trực tiếp

Chạy:

```powershell
docker compose logs -f
```

Nhấn `Ctrl + C` để ngừng theo dõi log. Thao tác này không yêu cầu dừng các container đang chạy.

## 8. Địa chỉ truy cập hệ thống

Theo cấu hình cổng dự kiến của dự án:

| Dịch vụ | Địa chỉ |
|---|---|
| Ứng dụng | http://localhost:3000 |
| Nginx | http://localhost:8080 |
| pgAdmin | http://localhost:5050 |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |
| Loki | http://localhost:3100 |

**Lưu ý:** Các cổng trên phải khớp với phần `ports` trong file `docker-compose.yml`. Nếu cấu hình khác, hãy sử dụng cổng thực tế của dự án.

### 8.1. Ứng dụng Restaurant Order

Mở địa chỉ ứng dụng trên trình duyệt để kiểm tra giao diện và chức năng được triển khai.

Nếu không truy cập được, kiểm tra trạng thái container và log của dịch vụ `app`.

### 8.2. Nginx

Mở địa chỉ Nginx để kiểm tra reverse proxy.

Nếu Nginx trả về lỗi, kiểm tra file `nginx/default.conf`, địa chỉ upstream và trạng thái container ứng dụng.

### 8.3. Prometheus

Mở giao diện Prometheus và vào mục **Status → Targets** để kiểm tra trạng thái các target.

Target hoạt động bình thường thường có trạng thái `UP`. Nếu target là `DOWN`, kiểm tra cấu hình scrape và khả năng kết nối đến dịch vụ đích.

### 8.4. Grafana

Mở Grafana và đăng nhập bằng tài khoản được cấu hình trong Docker Compose hoặc cấu hình môi trường của dự án.

Kiểm tra data source và dashboard đã được thiết lập. Nếu chưa có dashboard, cần cấu hình thêm trước khi sử dụng.

### 8.5. Loki và Promtail

Loki tiếp nhận và lưu trữ log; Promtail thu thập log theo cấu hình rồi gửi đến Loki.

Trong Grafana, mở **Explore**, chọn data source Loki và thực hiện truy vấn LogQL phù hợp với nhãn thực tế của log.

Ví dụ, nếu cấu hình Promtail gán nhãn `job="system-logs"`, có thể truy vấn:

```logql
{job="system-logs"}
```

Truy vấn chỉ trả về log nếu Promtail đang gửi log có nhãn này đến Loki và Grafana đã kết nối đúng data source.

## 9. Quản lý hệ thống

### Kiểm tra trạng thái container

```powershell
docker compose ps
```

### Xem log

```powershell
docker compose logs -f
```

### Khởi động lại hệ thống

```powershell
docker compose restart
```

### Dừng các dịch vụ

```powershell
docker compose stop
```

### Khởi động lại các dịch vụ đã dừng

```powershell
docker compose start
```

### Dừng và xóa container, mạng do Compose tạo

```powershell
docker compose down
```

Lệnh trên không xóa các named volume trừ khi có thêm tùy chọn xóa volume. Dữ liệu trong volume có thể được giữ lại.

**Không chạy `docker compose down -v` nếu chưa chắc chắn**, vì lệnh này có thể xóa volume chứa dữ liệu cơ sở dữ liệu.

## 10. Xử lý sự cố thường gặp

### Docker Desktop không chạy

1. Mở Docker Desktop.
2. Chờ Docker Engine khởi động hoàn tất.
3. Chạy `docker info`.
4. Nếu vẫn lỗi, kiểm tra thông báo trong Docker Desktop.

### Container không khởi động

Chạy:

```powershell
docker compose ps -a
docker compose logs --tail=100
```

Kiểm tra log để xác định dịch vụ và nguyên nhân gây lỗi.

### Cổng đã được sử dụng

Nếu Docker báo cổng đã được sử dụng, kiểm tra tiến trình đang sử dụng cổng hoặc đổi cổng phía máy chủ trong `docker-compose.yml`.

Ví dụ, ánh xạ `8081:80` sẽ dùng cổng `8081` trên máy chủ để truy cập dịch vụ lắng nghe ở cổng `80` trong container.

### Không truy cập được ứng dụng

Kiểm tra:
- Container ứng dụng có đang chạy không.
- Cổng đã được ánh xạ đúng chưa.
- Ứng dụng có lắng nghe trên địa chỉ phù hợp trong container không.
- Log ứng dụng và Nginx có lỗi không.

### Prometheus không thu thập được số liệu

Kiểm tra cấu hình Prometheus, tên dịch vụ, cổng nội bộ và trạng thái trong mục **Status → Targets**.

### Grafana không hiển thị dữ liệu

Kiểm tra data source, kết nối đến Prometheus hoặc Loki và khoảng thời gian truy vấn.

### Loki không có log

Kiểm tra trạng thái Loki và Promtail, đường dẫn log được mount và nhãn được gán trong cấu hình Promtail.

## 11. Bảo mật

- Không đưa mật khẩu thật hoặc file `.env` chứa thông tin bí mật lên GitHub.
- Sử dụng mật khẩu mạnh cho PostgreSQL và pgAdmin.
- Chỉ mở các cổng cần thiết.
- Hạn chế quyền của container theo khả năng hỗ trợ của từng dịch vụ.
- Kiểm tra cấu hình Nginx và các security headers.
- Phân tách mạng ứng dụng và mạng giám sát khi phù hợp.
- Không công khai dịch vụ quản trị cơ sở dữ liệu ra Internet nếu không cần thiết.

Các biện pháp bảo mật cần được xác minh trực tiếp trong cấu hình thực tế trước khi kết luận hệ thống đã đáp ứng đầy đủ.

## 12. Quản lý mã nguồn bằng Git

Kiểm tra trạng thái:

```powershell
git status
```

Xem lịch sử commit:

```powershell
git log --oneline
```

Sau khi sửa file, có thể tạo commit mới:

```powershell
git add .
git commit -m "Describe your changes"
git push
```

Trước khi chạy `git add .`, hãy kiểm tra `.gitignore` và chắc chắn không đưa mật khẩu, file bí mật hoặc dữ liệu không cần thiết lên GitHub.

## 13. Kết luận

Dự án kết hợp triển khai ứng dụng web bằng Docker Compose với các thành phần quản lý cơ sở dữ liệu, reverse proxy, giám sát và thu thập log.

Kết quả triển khai cần được kiểm tra bằng trạng thái container, khả năng truy cập ứng dụng, trạng thái target của Prometheus, dashboard Grafana và truy vấn log trên Loki.