# Feature Specification: Domain & Hosting Homepage

**Feature Branch**: `002-domain-hosting-homepage`  
**Created**: 2025-12-11  
**Status**: Draft  
**Input**: User description: "Sửa lại homepage hiển thị trang bán domain và hosting, dịch vụ SSL, các dịch vụ. Trang admin chỉ thay link và đổi theme trang"

## Tổng quan

Chuyển đổi homepage từ trang placeholder sang trang bán hàng thực sự cho các dịch vụ domain, hosting và SSL. Trang admin được đơn giản hóa để chỉ quản lý affiliate links và theme của homepage.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Khách hàng xem trang bán dịch vụ (Priority: P1)

Khách hàng truy cập homepage và xem các dịch vụ được cung cấp: đăng ký domain, web hosting, SSL certificates và các dịch vụ liên quan. Mỗi dịch vụ có mô tả ngắn gọn và nút CTA để chuyển đến trang affiliate.

**Why this priority**: Đây là mục tiêu chính của homepage - hiển thị và quảng bá các dịch vụ để tạo traffic affiliate.

**Independent Test**: Có thể test bằng cách truy cập homepage và xác nhận hiển thị đầy đủ các dịch vụ với thông tin và CTA buttons.

**Acceptance Scenarios**:

1. **Given** khách hàng truy cập homepage, **When** trang load xong, **Then** hiển thị danh sách các dịch vụ: Domain, Hosting, SSL với mô tả và giá tham khảo
2. **Given** khách hàng đang xem homepage, **When** click vào CTA button của dịch vụ, **Then** chuyển hướng đến link affiliate tương ứng
3. **Given** khách hàng trên mobile, **When** xem homepage, **Then** giao diện responsive và dễ sử dụng

---

### User Story 2 - Admin thay đổi affiliate links (Priority: P1)

Admin đăng nhập và thay đổi các affiliate links cho từng dịch vụ trên homepage. Không cần tạo/xóa landing pages phức tạp, chỉ cập nhật links.

**Why this priority**: Đây là yêu cầu core cho admin - khả năng cập nhật links affiliate đơn giản và nhanh chóng.

**Independent Test**: Có thể test bằng cách đăng nhập admin, thay đổi link, lưu và xác nhận link mới hiển thị đúng trên homepage.

**Acceptance Scenarios**:

1. **Given** admin đã đăng nhập, **When** truy cập trang cài đặt homepage, **Then** thấy form để nhập affiliate links cho từng dịch vụ
2. **Given** admin đang chỉnh sửa links, **When** thay đổi link và nhấn lưu, **Then** links được cập nhật và hiển thị thông báo thành công
3. **Given** links đã được cập nhật, **When** khách hàng click CTA trên homepage, **Then** chuyển đến link affiliate mới

---

### User Story 3 - Admin đổi theme trang (Priority: P2)

Admin có thể chọn theme/style cho homepage từ các templates có sẵn (đã có 10 templates trong hệ thống).

**Why this priority**: Theme giúp tùy biến giao diện nhưng không critical bằng việc hiển thị dịch vụ và quản lý links.

**Independent Test**: Có thể test bằng cách chọn theme khác trong admin và xác nhận homepage hiển thị đúng theme mới.

**Acceptance Scenarios**:

1. **Given** admin đã đăng nhập, **When** truy cập phần chọn theme, **Then** thấy danh sách các themes có sẵn với preview
2. **Given** admin đang chọn theme, **When** chọn theme và lưu, **Then** homepage áp dụng theme mới ngay lập tức
3. **Given** theme đã thay đổi, **When** khách hàng truy cập homepage, **Then** giao diện hiển thị theo theme được chọn

---

### Edge Cases

- Admin nhập link không hợp lệ (không phải URL) → Hiển thị lỗi validation
- Admin để trống link của dịch vụ → Ẩn CTA button hoặc hiển thị "Coming soon"
- Không có theme nào được chọn → Sử dụng theme mặc định (Template 1)
- Người dùng truy cập homepage khi admin đang cập nhật → Hiển thị version cũ cho đến khi lưu xong

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Homepage MUST hiển thị danh sách dịch vụ: Domain Registration, Web Hosting, SSL Certificates
- **FR-002**: Mỗi dịch vụ MUST có tiêu đề, mô tả ngắn, và CTA button
- **FR-003**: CTA buttons MUST chuyển hướng đến affiliate links được cấu hình
- **FR-004**: Admin MUST có thể cập nhật affiliate link cho từng dịch vụ
- **FR-005**: Admin MUST có thể chọn theme cho homepage từ các templates có sẵn
- **FR-006**: Homepage MUST responsive trên mobile, tablet và desktop
- **FR-007**: System MUST validate URLs trước khi lưu affiliate links
- **FR-008**: System MUST lưu cấu hình homepage (links và theme) vào database
- **FR-009**: Admin panel MUST được bảo vệ bằng authentication (đã có NextAuth)
- **FR-010**: Homepage MUST track clicks vào affiliate links (để thống kê)

### Key Entities

- **HomepageConfig**: Cấu hình tổng thể cho homepage
  - selectedTheme: Template được chọn (1-10)
  - services: Danh sách dịch vụ với affiliate links
  - updatedAt: Thời gian cập nhật cuối

- **Service**: Thông tin một dịch vụ
  - name: Tên dịch vụ (Domain, Hosting, SSL, etc.)
  - description: Mô tả ngắn
  - affiliateLink: Link affiliate
  - icon: Icon đại diện
  - isActive: Có hiển thị hay không

## Assumptions

- Sử dụng 10 templates đã có trong hệ thống
- Admin authentication đã có sẵn qua NextAuth
- Database MongoDB đã được cấu hình
- Các dịch vụ mặc định: Domain Registration, Web Hosting, SSL Certificates (có thể thêm sau)
- Theme mặc định là Template 1 nếu chưa cấu hình

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Homepage load hoàn chỉnh trong dưới 3 giây trên kết nối 3G
- **SC-002**: Admin có thể cập nhật links và theme trong dưới 1 phút
- **SC-003**: 100% CTA clicks được track và ghi nhận vào thống kê
- **SC-004**: Homepage hiển thị đúng trên 95% các thiết bị phổ biến (Chrome, Safari, Firefox trên desktop và mobile)
- **SC-005**: Admin panel đơn giản với tối đa 2 bước để thay đổi link hoặc theme
