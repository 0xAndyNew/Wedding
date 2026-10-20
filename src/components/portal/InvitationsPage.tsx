import React from 'react'
import { Sparkles, CheckCircle2, QrCode, MapPin, Heart } from 'lucide-react'
import { invitationTemplates, InvitationTemplate } from '../../data/plannerData.ts'
import { LotusMark } from '../common/BrandLogo.tsx'
import { PortalNavTab } from './PortalHeader.tsx'

interface InvitationsPageProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenInvitation3D: () => void
  onOpenConsultationModal: (serviceId?: string) => void
}

export const InvitationsPage: React.FC<InvitationsPageProps> = ({
  onSelectTab,
  onOpenInvitation3D,
  onOpenConsultationModal,
}) => {
  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Thư viện mẫu thiệp cưới trực tuyến
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal mt-3 mb-4">
            Thiệp cưới 3D kỹ thuật số độc quyền
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-base text-muted leading-relaxed">
            Kết hợp cảm giác mở phong bì niêm phong sáp chân thực với sự tiện lợi của công nghệ: xác nhận tham dự (RSVP), sổ lời chúc, bản đồ GPS và mã QR chia sẻ tức thì.
          </p>
        </div>

        {/* Featured 3D Interactive Banner */}
        <div className="bg-gradient-to-r from-cream via-ivory to-cream rounded-3xl p-8 sm:p-12 border border-champagne/70 shadow-luxury mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trải nghiệm 3D độc quyền</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-ink font-semibold mb-3">
                Mở bao thư phong ấn sáp niêm phong (Wax Seal)
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-2xl mb-6">
                Khi khách mời chạm vào con dấu hoa sen, phong bì từ từ bung mở kèm âm thanh lãng mạn và cánh hoa bay lượn, mang lại cảm xúc vẹn nguyên như được nhận một bức thư tay sang trọng ngoài đời thực.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenInvitation3D}
                  className="px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-serif italic text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-champagne-light" />
                  <span>Mở Thiệp 3D Thử Nghiệm Ngay</span>
                </button>
                <span className="text-xs text-muted">
                  ✦ Tối ưu mượt mà 60 FPS trên cả iPhone & Android
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div
                onClick={onOpenInvitation3D}
                className="cursor-pointer group relative p-6 bg-white rounded-3xl border border-champagne shadow-luxury text-center hover:scale-105 transition-all duration-300"
              >
                <LotusMark size={84} ring strokeColor="#B58A45" className="mx-auto mb-3" />
                <span className="font-serif text-lg font-semibold text-ink block">
                  Phong Bì Hoàng Gia
                </span>
                <span className="text-xs text-gold font-serif italic block mt-1">
                  Chạm để mở sáp niêm phong
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Template Catalog Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Bộ sưu tập mẫu thiệp
            </span>
            <h3 className="font-serif text-3xl text-ink font-normal mt-1">
              Chọn phong cách phù hợp với hai bạn
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {invitationTemplates.map((template: InvitationTemplate) => (
              <div
                key={template.id}
                className="bg-white rounded-3xl overflow-hidden border border-line shadow-luxury-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Preview Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={template.previewImage}
                      alt={template.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    {template.isHot && (
                      <span className="absolute top-4 right-4 bg-gold text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        Được yêu thích nhất
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-xl font-semibold text-ink mb-1">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gold font-serif italic mb-3">
                      {template.tagline}
                    </p>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      {template.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-4 border-t border-line/60">
                      {template.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-ink/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-moss flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={onOpenInvitation3D}
                    className="flex-1 py-2.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line font-medium text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Xem trước 3D</span>
                  </button>

                  <button
                    onClick={() => onOpenConsultationModal('thiep-cuoi-truc-tuyen')}
                    className="flex-1 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white font-medium text-xs text-center shadow-sm transition-all"
                  >
                    Dùng mẫu này
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Couple Benefit Highlights */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-luxury-sm mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl text-ink font-semibold">
              Trải nghiệm thông minh cho cô dâu chú rể
            </h3>
            <p className="text-xs text-muted mt-2">
              Bảng quản trị riêng giúp bạn nắm bắt mọi phản hồi của khách mời trong tích tắc
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <QrCode className="w-8 h-8 text-gold mx-auto mb-3" />
              <h5 className="font-serif text-sm font-semibold text-ink">Mã QR & Link Riêng</h5>
              <p className="text-xs text-muted mt-1">Dễ dàng in lên thiệp giấy hoặc gửi thiệp qua tin nhắn.</p>
            </div>

            <div className="p-4">
              <CheckCircle2 className="w-8 h-8 text-gold mx-auto mb-3" />
              <h5 className="font-serif text-sm font-semibold text-ink">Quản Lý RSVP</h5>
              <p className="text-xs text-muted mt-1">Biết chính xác số lượng khách tham dự để đặt tiệc chuẩn xác.</p>
            </div>

            <div className="p-4">
              <Heart className="w-8 h-8 text-gold mx-auto mb-3" />
              <h5 className="font-serif text-sm font-semibold text-ink">Lưu Bút & Lời Chúc</h5>
              <p className="text-xs text-muted mt-1">Lưu giữ mãi mãi những tình cảm ấm áp của bạn bè, người thân.</p>
            </div>

            <div className="p-4">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
              <h5 className="font-serif text-sm font-semibold text-ink">Chỉ Đường Google Maps</h5>
              <p className="text-xs text-muted mt-1">Khách mở vị trí và tìm đường đến nhà hàng chỉ bằng 1 cú chạm.</p>
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => onSelectTab('services')}
              className="px-6 py-2.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line text-xs font-semibold transition-colors"
            >
              Khám phá toàn bộ gói dịch vụ Wedding Planner →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
