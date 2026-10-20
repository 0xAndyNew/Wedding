import React from 'react'
import { Phone, Mail, MapPin, Clock, ArrowUp, ShieldCheck } from 'lucide-react'
import { BrandLogo, LotusMark } from '../common/BrandLogo.tsx'
import { brandInfo } from '../../data/plannerData.ts'
import { PortalNavTab } from './PortalHeader.tsx'

interface PortalFooterProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenInvitation3D: () => void
  onOpenAdmin: () => void
}

export const PortalFooter: React.FC<PortalFooterProps> = ({
  onSelectTab,
  onOpenInvitation3D,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#29251F] text-[#FFFDF8] pt-16 pb-12 border-t border-line/20 relative overflow-hidden">
      {/* Subtle decorative background watermarks */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4">
        <LotusMark size={400} strokeColor="#D5B77A" ring />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <BrandLogo variant="horizontal" size="lg" dark onClick={() => onSelectTab('home')} />

            <p className="mt-4 text-sm text-[#D7CABB] leading-relaxed max-w-sm">
              Định hướng thương hiệu dành cho dịch vụ tổ chức cưới và thiệp cưới điện tử cao cấp tại Việt Nam.
              Mỗi chi tiết đều hướng đến sự trang nhã, ấm áp và mang dấu ấn độc bản của từng gia đình.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-champagne-light">
                ✦ Sang trọng
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-champagne-light">
                ✦ Đậm chất Việt
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-champagne-light">
                ✦ Cá nhân hóa
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-champagne-light">
                ✦ Tinh tế
              </span>
            </div>
          </div>

          {/* Quick Navigation Links (Cols 6-8) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-champagne-light mb-4 tracking-wider">
              Khám Phá
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D7CABB]">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about')
                    scrollToTop()
                  }}
                  className="hover:text-champagne transition-colors"
                >
                  Giới thiệu thương hiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('process')
                    scrollToTop()
                  }}
                  className="hover:text-champagne transition-colors"
                >
                  Quy trình làm việc
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('services')
                    scrollToTop()
                  }}
                  className="hover:text-champagne transition-colors"
                >
                  Các gói dịch vụ cưới
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('projects')
                    scrollToTop()
                  }}
                  className="hover:text-champagne transition-colors"
                >
                  Dự án & Album thực tế
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('invitations')
                    scrollToTop()
                  }}
                  className="hover:text-champagne transition-colors"
                >
                  Thư viện thiệp cưới điện tử
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInvitation3D}
                  className="text-gold hover:text-champagne-light font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Mở thiệp cưới 3D</span>
                  <span className="text-xs">↗</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('privacy')
                    scrollToTop()
                  }}
                  className="hover:text-champagne transition-colors text-xs text-white/60"
                >
                  Chính sách quyền riêng tư
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Cols 9-12) */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-lg text-champagne-light mb-4 tracking-wider">
              Liên Hệ & Đặt Hẹn
            </h4>
            <div className="space-y-3.5 text-sm text-[#D7CABB]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{brandInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`tel:${brandInfo.hotline}`} className="hover:text-champagne">
                  {brandInfo.hotline} / {brandInfo.hotlineSecondary}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${brandInfo.email}`} className="hover:text-champagne">
                  {brandInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{brandInfo.workingHours}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onSelectTab('contact')
                  scrollToTop()
                }}
                className="w-full py-2.5 px-4 rounded-full bg-gold/90 hover:bg-gold text-white font-medium text-xs text-center transition-all shadow-sm"
              >
                Gửi Yêu Cầu Tư Vấn Ngay
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Xuân Hiếu Hương Thảo. Toàn bộ bản quyền được bảo lưu.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 hover:text-champagne-light transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Quản trị viên</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-champagne-light transition-colors"
            >
              <span>Về đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
