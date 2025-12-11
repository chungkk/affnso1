# Feature Specification: Affiliate Landing Pages cho Domain/Hosting

**Feature Branch**: `001-aff-landing-pages`  
**Created**: 2025-12-10  
**Status**: Draft  
**Input**: User description: "Trang affiliate cho link 'https://network-solutions.7eer.net/q4EbgO', bán domain, hosting, SSL cho networksolutions.com. Giao diện đơn giản, responsive desktop/mobile. 10 giao diện khác nhau. Admin panel để quản lý link, tiêu đề, mô tả cho từng trang."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Khách truy cập xem trang landing và click affiliate link (Priority: P1)

Khách truy cập vào trang landing page và thấy thông tin về dịch vụ domain/hosting/SSL của Network Solutions. Giao diện hiển thị đẹp trên cả desktop và mobile. Khách có thể click vào nút/link để được chuyển hướng đến trang affiliate partner.

**Why this priority**: Đây là mục đích chính của trang - chuyển đổi khách truy cập thành clicks affiliate để kiếm hoa hồng.

**Independent Test**: Có thể test bằng cách truy cập trang landing, kiểm tra giao diện responsive, và xác nhận click vào CTA button chuyển hướng đúng đến affiliate link.

**Acceptance Scenarios**:

1. **Given** khách truy cập trang landing trên desktop, **When** trang tải xong, **Then** hiển thị đầy đủ nội dung với layout desktop phù hợp
2. **Given** khách truy cập trang landing trên mobile, **When** trang tải xong, **Then** hiển thị giao diện mobile-friendly, dễ đọc và tương tác
3. **Given** khách đang xem trang landing, **When** click vào nút CTA (Call-to-Action), **Then** được chuyển hướng đến affiliate link đã cấu hình

---

### User Story 2 - Admin đăng nhập và quản lý cấu hình trang (Priority: P1)

Admin đăng nhập vào trang quản trị để thay đổi cấu hình cho từng trang landing: affiliate link, tiêu đề trang, mô tả trang, và chọn giao diện (1 trong 10 templates).

**Why this priority**: Admin cần khả năng quản lý để điều chỉnh chiến dịch affiliate mà không cần can thiệp code.

**Independent Test**: Có thể test bằng cách đăng nhập admin, thay đổi tiêu đề/link/template của một trang, lưu và xác nhận thay đổi hiển thị đúng trên trang landing.

**Acceptance Scenarios**:

1. **Given** admin có tài khoản hợp lệ, **When** nhập đúng username/password, **Then** được đăng nhập vào trang quản trị
2. **Given** admin đã đăng nhập, **When** thay đổi affiliate link và lưu, **Then** trang landing sử dụng link mới cho CTA buttons
3. **Given** admin đã đăng nhập, **When** thay đổi tiêu đề và mô tả trang, **Then** trang landing hiển thị tiêu đề/mô tả mới
4. **Given** admin đã đăng nhập, **When** chọn template khác (1-10) cho trang, **Then** trang landing hiển thị với giao diện template đã chọn

---

### User Story 3 - Admin tạo và quản lý nhiều trang landing (Priority: P2)

Admin có thể tạo nhiều trang landing khác nhau, mỗi trang có URL riêng, cấu hình riêng (link, tiêu đề, mô tả, template).

**Why this priority**: Cho phép chạy nhiều chiến dịch affiliate với các giao diện và target khác nhau.

**Independent Test**: Có thể test bằng cách tạo 2-3 trang landing với cấu hình khác nhau, truy cập từng URL và xác nhận mỗi trang hiển thị đúng cấu hình riêng.

**Acceptance Scenarios**:

1. **Given** admin đã đăng nhập, **When** tạo trang landing mới với URL slug, **Then** trang được tạo và có thể truy cập qua URL đó
2. **Given** có nhiều trang landing tồn tại, **When** admin xem danh sách trang, **Then** hiển thị tất cả các trang với thông tin cơ bản
3. **Given** admin đang xem danh sách, **When** chọn một trang để chỉnh sửa, **Then** có thể thay đổi cấu hình của trang đó độc lập với các trang khác

---

### User Story 4 - Admin xem thống kê cơ bản (Priority: P3)

Admin có thể xem số lượt truy cập và số lần click vào affiliate link của từng trang.

**Why this priority**: Giúp đánh giá hiệu quả các trang landing để tối ưu chiến dịch.

**Independent Test**: Có thể test bằng cách truy cập trang landing vài lần, click vào link, sau đó kiểm tra trong admin xem số liệu có cập nhật không.

**Acceptance Scenarios**:

1. **Given** trang landing đã có traffic, **When** admin xem thống kê, **Then** hiển thị số lượt truy cập (page views)
2. **Given** khách đã click affiliate link, **When** admin xem thống kê, **Then** hiển thị số lần click vào affiliate link

---

### Edge Cases

- Khi affiliate link không hợp lệ hoặc trống: Hiển thị thông báo lỗi cho admin khi lưu, không cho phép lưu link trống
- Khi URL slug đã tồn tại: Thông báo lỗi và yêu cầu chọn slug khác
- Khi admin nhập URL slug với ký tự đặc biệt: Tự động sanitize hoặc thông báo yêu cầu chỉ dùng chữ, số, gạch ngang
- Khi template không tồn tại: Fallback về template mặc định (template 1)
- Khi đăng nhập sai quá 5 lần: Khóa tạm thời 15 phút để bảo mật

## Requirements *(mandatory)*

### Functional Requirements

**Landing Page (Frontend)**
- **FR-001**: Hệ thống PHẢI hiển thị 10 giao diện/template khác nhau cho trang landing, mỗi template có thiết kế riêng biệt
- **FR-002**: Mỗi template PHẢI responsive, hiển thị tốt trên desktop (>1024px) và mobile (<768px)
- **FR-003**: Trang landing PHẢI hiển thị tiêu đề, mô tả, và nút CTA dẫn đến affiliate link
- **FR-004**: Nội dung trang PHẢI tập trung vào domain, hosting, SSL - các sản phẩm của Network Solutions, hiển thị bằng tiếng Anh
- **FR-005**: Trang PHẢI tải nhanh, không quá 3 giây trên kết nối 3G

**Admin Panel**
- **FR-006**: Admin PHẢI đăng nhập bằng username và password để truy cập quản trị
- **FR-007**: Admin PHẢI có thể tạo, xem, sửa, xóa các trang landing
- **FR-008**: Admin PHẢI có thể cấu hình cho mỗi trang: affiliate link, tiêu đề, mô tả, chọn template (1-10)
- **FR-009**: Admin PHẢI có thể đặt URL slug riêng cho mỗi trang landing
- **FR-010**: Hệ thống PHẢI validate affiliate link là URL hợp lệ trước khi lưu
- **FR-011**: Admin PHẢI có thể xem danh sách tất cả các trang landing đã tạo

**Thống kê**
- **FR-012**: Hệ thống PHẢI ghi nhận số lượt truy cập (page views) cho mỗi trang
- **FR-013**: Hệ thống PHẢI ghi nhận số lần click vào affiliate link cho mỗi trang
- **FR-014**: Admin PHẢI có thể xem thống kê page views và clicks trong admin panel

### Key Entities

- **LandingPage**: Đại diện một trang landing - bao gồm URL slug, tiêu đề, mô tả, affiliate link, template được chọn (1-10), trạng thái (active/inactive)
- **Admin**: Người quản trị hệ thống - username, password (mã hóa), quyền truy cập admin panel
- **PageStatistic**: Thống kê cho mỗi trang - page views, affiliate clicks, theo ngày hoặc tổng cộng

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Trang landing tải hoàn chỉnh trong vòng 3 giây trên kết nối 3G
- **SC-002**: 100% các template (10 templates) hiển thị đúng trên cả desktop và mobile
- **SC-003**: Admin có thể tạo một trang landing mới và publish trong vòng 2 phút
- **SC-004**: Thay đổi cấu hình (link/tiêu đề/template) có hiệu lực ngay lập tức sau khi lưu
- **SC-005**: Hệ thống ghi nhận chính xác 100% các page views và affiliate clicks
- **SC-006**: Admin có thể quản lý tối thiểu 50 trang landing mà không gặp vấn đề về hiệu suất

## Clarifications

### Session 2025-12-10

- Q: Ngôn ngữ nội dung trang landing? → A: Tiếng Anh toàn trang
- Q: Phương thức hosting/deployment? → A: Next.js + MongoDB

## Assumptions

- Affiliate link format sẽ theo dạng: `https://network-solutions.7eer.net/{tracking_id}`
- Chỉ cần 1 tài khoản admin (single admin) cho hệ thống
- Templates là các giao diện tĩnh, được tạo sẵn, không cần admin tùy chỉnh chi tiết từng template
- Nội dung sản phẩm (domain, hosting, SSL) sẽ được tích hợp sẵn trong templates, admin chỉ thay đổi tiêu đề/mô tả chung
- Thống kê hiển thị tổng số, không cần phân tích theo thời gian chi tiết (theo ngày/tuần/tháng)
- Không cần tích hợp với hệ thống analytics bên ngoài (Google Analytics, etc.)
- Tech stack: Next.js cho frontend/backend, MongoDB cho database
