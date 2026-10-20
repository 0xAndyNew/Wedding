import React from 'react'
import { Shield, Lock, EyeOff, UserCheck, CheckCircle2 } from 'lucide-react'
import { brandInfo } from '../../data/plannerData.ts'
import { PortalNavTab } from './PortalHeader.tsx'

interface PrivacyPageProps {
  onSelectTab: (tab: PortalNavTab) => void
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onSelectTab }) => {
  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Bảo mật & Quyền riêng tư
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-3 mb-4">
            Chính Sách Quyền Riêng Tư & Bảo Mật Dữ Liệu
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-sm text-muted">
            Cập nhật lần cuối: Ngày 20 tháng 10 năm 2026 · Thương hiệu Xuân Hiếu Hương Thảo
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-luxury-sm space-y-8 text-sm text-ink/85 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              <span>1. Cam Kết Bảo Vệ Quyền Riêng Tư Của Cặp Đôi & Khách Mời</span>
            </h2>
            <p className="text-muted">
              Tại <strong>Xuân Hiếu Hương Thảo</strong>, chúng tôi hiểu rằng ngày cưới là khoảnh khắc thiêng liêng và chứa đựng nhiều thông tin cá nhân của gia đình hai bên. Chúng tôi cam kết bảo vệ dữ liệu cá nhân của cô dâu, chú rể và toàn thể khách mời tham dự theo các chuẩn mực bảo mật cao nhất.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              <span>2. Thu Thập & Sử Dụng Thông Tin</span>
            </h2>
            <p className="text-muted mb-3">
              Chúng tôi chỉ thu thập các thông tin thực sự cần thiết để phục vụ công tác tổ chức tiệc cưới và quản lý thiệp mời:
            </p>
            <ul className="space-y-2 text-xs text-muted pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                <span><strong>Thông tin cặp đôi:</strong> Họ tên cô dâu chú rể, song thân phụ mẫu, số điện thoại, ngày giờ, địa điểm tổ chức và hình ảnh cưới.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                <span><strong>Thông tin khách mời xác nhận tham dự (RSVP):</strong> Họ tên khách, số điện thoại liên lạc, số lượng người đi cùng và ghi chú về thực đơn (nếu có).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                <span><strong>Lời chúc phúc (Guestbook):</strong> Lời chúc của khách gửi tới cô dâu chú rể trên sổ lưu bút điện tử.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-gold" />
              <span>3. Bảo Vệ Danh Sách Khách Mời & Không Công Khai Dữ Liệu</span>
            </h2>
            <p className="text-muted mb-2">
              - Danh sách phản hồi RSVP, số điện thoại của khách mời chỉ được hiển thị trong khu vực quản trị dành riêng cho cô dâu chú rể và quản trị viên được cấp quyền.
            </p>
            <p className="text-muted mb-2">
              - Hệ thống ngăn chặn việc lộ số điện thoại, địa chỉ cá nhân qua các đường link công khai của thiệp cưới.
            </p>
            <p className="text-muted">
              - Các lời chúc của khách mời được kiểm duyệt trước khi hiển thị trên trang thiệp cưới nhằm đảm bảo không gian trang nhã và lịch sự.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-gold" />
              <span>4. Quyền Kiểm Soát Dữ Liệu Của Cặp Đôi</span>
            </h2>
            <p className="text-muted">
              Cô dâu chú rể có toàn quyền:
            </p>
            <ul className="space-y-1.5 text-xs text-muted pl-4 mt-2">
              <li>✦ Chỉnh sửa thông tin thiệp cưới hoặc ẩn thiệp sau khi ngày cưới kết thúc.</li>
              <li>✦ Xuất danh sách khách xác nhận tham dự ra tệp bảng tính (Excel/CSV) để phục vụ sắp xếp bàn tiệc.</li>
              <li>✦ Yêu cầu gỡ bỏ hoặc cập nhật hình ảnh trong album cưới bất cứ lúc nào.</li>
            </ul>
          </section>

          <section className="pt-4 border-t border-line">
            <h2 className="font-serif text-base font-semibold text-ink mb-2">
              5. Liên Hệ Bộ Phận Quản Trị & Bảo Mật
            </h2>
            <p className="text-xs text-muted">
              Mọi thắc mắc liên quan đến chính sách quyền riêng tư và dữ liệu cá nhân, quý khách vui lòng liên hệ trực tiếp:
            </p>
            <div className="mt-3 p-4 bg-cream rounded-2xl text-xs text-ink/80 space-y-1">
              <p>✦ <strong>Thương hiệu:</strong> {brandInfo.name}</p>
              <p>✦ <strong>Hotline:</strong> {brandInfo.hotline}</p>
              <p>✦ <strong>Email:</strong> {brandInfo.email}</p>
              <p>✦ <strong>Địa chỉ:</strong> {brandInfo.address}</p>
            </div>
          </section>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onSelectTab('home')}
            className="px-6 py-2.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line text-xs font-semibold transition-colors"
          >
            ← Quay Lại Trang Chủ
          </button>
        </div>
      </div>
    </div>
  )
}
