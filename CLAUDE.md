# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavioral Guidelines

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

---

## Project Overview

**Xuân Hiếu Hương Thảo – Wedding Planner & Thiệp cưới trực tuyến** là nền tảng kết hợp hai mảng dịch vụ trọng tâm phục vụ thị trường cưới cao cấp tại Việt Nam:
1. **Dịch vụ Wedding Planner & Tổ chức cưới trọn gói**: Tư vấn ý tưởng, trang trí không gian tiệc cưới, lễ gia tiên, ảnh/phim cưới, điều phối ngày cưới.
2. **Nền tảng Thiệp cưới trực tuyến cao cấp (Interactive Digital Invitation)**: Thiệp cưới 3D mở phong bì sáp niêm phong (wax seal), cá nhân hóa thông tin, album ảnh cưới, bản đồ chỉ đường, nhạc nền tinh tế, mã QR, xác nhận tham dự (RSVP) và sổ lưu bút chúc phúc.
3. **Hệ thống Quản trị (Admin Portal)**: Bảng điều khiển quản lý hồ sơ cặp đôi, mẫu thiệp, khách mời RSVP, duyệt lời chúc, bộ sưu tập hình ảnh và cài đặt hệ thống.

---

## Design System & Nhận Diện Thương Hiệu (Luxury Champagne)

Dự án áp dụng bộ nhận diện thiết kế lấy cảm hứng từ sự thanh lịch hiện đại kết hợp bản sắc văn hóa Việt Nam:

- **Bảng màu chủ đạo (Color Palette)**:
  - Kem ngà (`--cream`): `#F7F1E8` (Màu nền trang nhã, phông nền thiệp)
  - Trắng ngà (`--ivory`): `#FFFDF8` (Nền thẻ card, khối nội dung nổi bật)
  - Vàng champagne (`--champagne`): `#D5B77A` (Đường viền, chi tiết trang trí, hiệu ứng sáng)
  - Vàng kim (`--gold`): `#B58A45` (Điểm nhấn CTA, nút bấm, con dấu sáp niêm phong)
  - Be ấm (`--beige`): `#E8DDD0` (Đường kẻ phân tách, nền phụ)
  - Nâu than (`--ink`): `#29251F` (Màu chữ chính, đảm bảo độ tương phản cao)
  - Xanh rêu điểm xuyết (`--green`): `#6B7964` (Điểm nhấn cành lá, hoa tươi thiên nhiên)
  - Màu chữ phụ (`--muted`): `#71685D`
- **Biểu trưng thương hiệu (Brand Symbol)**:
  - Biểu trưng hoa sen cách điệu mềm mại (Lotus emblem SVG) thể hiện nét truyền thống văn hóa cưới Việt Nam.
  - Slogan: *"Tinh tế trong từng khoảnh khắc · Đậm chất Việt"*, *"Hạnh phúc bắt đầu từ những điều được chăm chút."*
- **Typography & Font**:
  - Chữ tiêu đề (Display Serif): Cormorant Garamond, Playfair Display hoặc Cinzel.
  - Chữ nội dung (Body Text): Plus Jakarta Sans, Be Vietnam Pro hoặc Inter hỗ trợ 100% tiếng Việt có dấu.
- **Quy tắc thiết kế**:
  - Tối ưu hóa hiển thị Mobile-first (điện thoại thông minh là thiết bị 90% khách mời mở thiệp).
  - Không lạm dụng màu vàng quá mức để giữ được chiều sâu sang trọng cao cấp.

---

## Cấu Trúc Kiến Trúc & Phân Hệ Chức Năng (Information Architecture)

### 1. Phân hệ Website Công Khai (Public Wedding Planner Portal)
- **Trang chủ (`/`)**: Hero giới thiệu thương hiệu, câu chuyện sứ mệnh, dịch vụ nổi bật, các dự án cưới tiêu biểu, mẫu thiệp mẫu và nút đặt lịch tư vấn.
- **Giới thiệu (`/about`)**: Câu chuyện thương hiệu Xuân Hiếu Hương Thảo, biểu trưng hoa sen, triết lý phục vụ.
- **Đội ngũ & Quy trình (`/process`)**: Quy trình làm việc từ lên ý tưởng, chuẩn bị, thử nghiệm đến điều phối ngày cưới.
- **Dịch vụ (`/services`)**: Danh sách 6 nhóm dịch vụ chính (Tổ chức tiệc, Trang trí lễ cưới, Ảnh/phim cưới, Thiệp cưới trực tuyến, Điều phối ngày cưới, Thiết kế theo yêu cầu).
- **Chi tiết dịch vụ (`/services/:id`)**: Thông tin chi tiết, bảng giá/gói dịch vụ, quy trình thực hiện.
- **Dự án & Album (`/projects`)**: Thư viện ảnh dạng lưới theo phong cách (*Thanh lịch vượt thời gian*, *Vườn hoa lãng mạn*, *Nét Việt trong ngày cưới*).
- **Thư viện mẫu thiệp cưới (`/invitations`)**: Trưng bày các mẫu thiệp điện tử tương tác và xem trước.
- **Liên hệ & Đặt lịch tư vấn (`/contact`)**: Biểu mẫu thu thập thông tin ngày cưới, nhu cầu và hẹn lịch tư vấn trực tiếp.
- **Chính sách & Điều khoản (`/privacy`)**: Chính sách bảo mật thông tin cặp đôi và khách mời.

### 2. Phân hệ Thiệp Cưới Trực Tuyến (Interactive Digital Invitation)
- **Bao thư 3D tương tác (3D Wax Seal Envelope)**: Trải nghiệm mở nắp bao thư sáp niêm phong Three.js kèm hiệu ứng âm thanh và cánh hoa rơi.
- **Thông tin thiệp cưới cá nhân hóa**: Tên cô dâu, chú rể, song thân phụ mẫu, ngày giờ tốt lành, đếm ngược (Countdown).
- **Chi tiết sự kiện & Bản đồ**: Lễ gia tiên / Lễ vu quy / Tiệc cưới nhà hàng kèm chỉ đường Google Maps GPS.
- **Album ảnh cưới & Love Story**: Trình chiếu ảnh chất lượng cao và các mốc thời gian hành trình tình yêu.
- **Xác nhận tham dự (RSVP)**: Khách chọn phía nhà trai/gái, số người tham dự, số điện thoại, ghi chú cỗ chay/dị ứng.
- **Sổ lưu bút lời chúc (Guestbook Wishes)**: Khách gửi lời chúc mừng kèm hiệu ứng pháo hoa hoa giấy (confetti).
- **Hộp mừng cưới & QR Code**: Quản lý thông tin số tài khoản và tạo mã QR chuyển khoản tinh tế.
- **Trình phát nhạc nền (Audio Player)**: Âm nhạc lãng mạn, tuân thủ Autoplay Policy (chỉ phát sau tương tác của người dùng).

### 3. Phân hệ Quản Trị (Admin Dashboard - `/admin`)
- **Tổng quan (Dashboard Overview)**: Số lượng cặp đôi, số thiệp cưới xuất bản, số khách RSVP, lời chúc chờ duyệt.
- **Quản lý cặp đôi**: Danh sách, thêm/sửa thông tin cô dâu, chú rể, ngày cưới, ảnh đại diện.
- **Quản lý thiệp cưới**: Chọn mẫu, chỉnh sửa thông tin thiệp, bật/tắt xuất bản, tạo đường dẫn chia sẻ và mã QR thiệp.
- **Quản lý khách mời & RSVP**: Danh sách khách đăng ký tham dự, lọc theo nhà trai/gái/chung, xuất dữ liệu ra CSV/Excel.
- **Quản lý nội dung & Duyệt lời chúc**: Duyệt lời chúc của khách trước khi hiển thị, quản lý ảnh thư viện.
- **Cài đặt hệ thống**: Tùy chỉnh thông tin liên hệ, thương hiệu, nhạc nền mặc định và sao lưu dữ liệu.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite.
- **3D Graphics & Scene**: Three.js (WebGL rendering mượt mà, PBR shader, wax seal 3D).
- **Styling**: Tailwind CSS với theme Luxury Champagne mở rộng.
- **Icons & Animation**: Lucide React, Canvas Confetti.
- **Utilities**: clsx, tailwind-merge.

---

## Common Development Commands

```bash
# Cài đặt thư viện dependencies
npm install

# Khởi chạy dev server (mặc định port 5173 hoặc cấu hình trong launch.json)
npm run dev

# Kiểm tra kiểu dữ liệu TypeScript và build production
npm run build

# Kiểm tra quy chuẩn mã nguồn (Linting)
npm run lint

# Xem trước bản build production
npm run preview
```

---

## Quy Trình Triển Khai 6 Giai Đoạn (Project Roadmap)

Tuân thủ nghiêm ngặt theo tài liệu yêu cầu:
1. **Giai đoạn 1 — Phân tích (Hoàn thành)**: Phân tích toàn bộ file thiết kế UI/UX HTML và file tài liệu yêu cầu TXT, đồng bộ hóa nhận diện thương hiệu.
2. **Giai đoạn 2 — Hoàn thiện giao diện Frontend**: Xây dựng toàn bộ trang công khai, trang thiệp cưới và trang quản trị với dữ liệu mẫu hoàn chỉnh, tương tác phản hồi mượt mà trên mobile/tablet/desktop. **Không triển khai backend trong giai đoạn này**.
3. **Giai đoạn 3 — Kiểm tra và duyệt**: Kiểm tra toàn diện UI/UX và nghiệm thu với khách hàng.
4. **Giai đoạn 4 — Xây dựng backend**: Thiết kế CSDL, API, phân quyền, xác thực và lưu trữ.
5. **Giai đoạn 5 — Tích hợp và kiểm thử**: Kết nối frontend và backend, kiểm thử luồng thực tế.
6. **Giai đoạn 6 — Bàn giao**: Cung cấp tài liệu vận hành và hướng dẫn triển khai.
