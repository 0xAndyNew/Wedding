import React from 'react'
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Heart,
  CheckCircle2,
  Layers,
  Music,
  MapPin,
  QrCode,
  Users,
} from 'lucide-react'
import { LotusMark } from '../common/BrandLogo.tsx'
import {
  plannerServices,
  plannerProjects,
  PlannerService,
} from '../../data/plannerData.ts'
import { PortalNavTab } from './PortalHeader.tsx'

interface HomePageProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenInvitation3D: () => void
  onOpenConsultationModal: (serviceId?: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenInvitation3D,
  onOpenConsultationModal,
}) => {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 bg-[radial-gradient(ellipse_at_85%_10%,#EFE0C2_0,transparent_40%),linear-gradient(135deg,#F7F1E8_0%,#FFFDF8_65%)] border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-light/70 border border-champagne text-gold text-xs font-semibold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Tinh tế trong từng khoảnh khắc</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-[1.12] tracking-tight">
                Ngày trọng đại, <br />
                <span className="italic text-[#9E7842] font-serif">dấu ấn riêng.</span>
              </h1>

              {/* Lead Paragraph */}
              <p className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                Cùng bạn kiến tạo một ngày cưới trọn vẹn — từ ý tưởng độc bản, không gian tiệc cưới điện ảnh đến tấm thiệp kỹ thuật số kể trọn vẹn câu chuyện tình yêu của hai bạn.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenConsultationModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-luxury-sm hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt Lịch Tư Vấn</span>
                </button>

                <button
                  onClick={onOpenInvitation3D}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ivory hover:bg-cream text-ink border border-champagne font-medium text-sm transition-all duration-200 shadow-sm hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="font-serif italic font-medium">Khám phá thiệp cưới 3D</span>
                  <span className="text-xs">↗</span>
                </button>

                <button
                  onClick={() => onSelectTab('services')}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-muted hover:text-gold transition-colors"
                >
                  <span>Xem dịch vụ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-note */}
              <div className="mt-10 pt-6 border-t border-line/70 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  Phong cách sang trọng
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  Dịch vụ tận tâm
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  Dấu ấn đậm chất Việt
                </span>
              </div>
            </div>

            {/* Right Visual Column (Arched Wedding Portrait Frame) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative glow backing */}
                <div className="absolute inset-0 bg-champagne/30 rounded-t-[180px] rounded-b-[24px] blur-2xl transform scale-95" />

                {/* Arched Photo Frame */}
                <div className="relative rounded-t-[180px] rounded-b-[24px] overflow-hidden border-8 border-[#FFFAF1] shadow-luxury">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
                    alt="Khoảnh khắc ngày cưới Xuân Hiếu Hương Thảo"
                    className="w-full h-[480px] sm:h-[520px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient Overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge Tag */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-ivory/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-line shadow-luxury flex items-center gap-3.5 max-w-[280px]">
                  <div className="w-10 h-10 rounded-full bg-champagne-light/70 border border-champagne flex items-center justify-center text-gold flex-shrink-0">
                    <Heart className="w-5 h-5 fill-gold/20 text-gold" />
                  </div>
                  <div>
                    <p className="font-serif italic text-sm text-ink font-medium leading-snug">
                      “Một ngày cưới, ngàn khoảnh khắc đáng nhớ”
                    </p>
                    <p className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
                      Xuân Hiếu Hương Thảo
                    </p>
                  </div>
                </div>

                {/* Floating 3D Badge on Top Right */}
                <div
                  onClick={onOpenInvitation3D}
                  className="absolute -top-3 -right-3 cursor-pointer bg-white px-3.5 py-2 rounded-full border border-champagne shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <LotusMark size={20} />
                  <span className="text-xs font-serif italic text-gold font-semibold">
                    Thiệp 3D Mẫu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BRAND STORY & VALUES (CÂU CHUYỆN THƯƠNG HIỆU)
          ========================================================================= */}
      <section className="py-20 bg-cream/40 border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Brand Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-ivory rounded-3xl p-8 sm:p-10 border border-line shadow-luxury text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
                  <LotusMark size={220} strokeColor="#B58A45" ring />
                </div>

                <LotusMark size={96} strokeColor="#B58A45" ring className="mx-auto mb-5" />

                <h3 className="font-serif text-2xl text-ink tracking-wider uppercase font-medium">
                  Xuân Hiếu Hương Thảo
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mt-1">
                  Wedding Planner · Thiệp Cưới
                </p>
                <div className="w-12 h-px bg-champagne mx-auto my-4" />
                <p className="text-xs text-muted italic font-serif">
                  Biểu trưng định hướng · Hoa sen và đường nét mềm mại
                </p>
              </div>
            </div>

            {/* Right Brand Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                Câu chuyện thương hiệu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-snug">
                Hạnh phúc bắt đầu từ những điều được chăm chút.
              </h2>
              <div className="w-16 h-0.5 bg-champagne my-4" />
              <p className="text-base text-muted leading-relaxed mb-4">
                <strong>Xuân Hiếu Hương Thảo</strong> là định hướng thương hiệu dành cho dịch vụ tổ chức cưới và thiệp cưới trực tuyến cao cấp tại Việt Nam. Mỗi chi tiết đều hướng đến sự trang nhã, ấm áp và mang dấu ấn riêng của từng gia đình.
              </p>
              <p className="text-base text-muted leading-relaxed mb-6">
                Thiết kế kết hợp tinh thần hiện đại với những nét gợi nhắc văn hóa Việt: hoa sen cách điệu, họa tiết hoa cưới, lời mời trang trọng và phong cách phục vụ chu đáo, gần gũi.
              </p>

              {/* 4 Brand Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {[
                  { title: 'Sang trọng', desc: 'Chuẩn mực cao cấp' },
                  { title: 'Đậm chất Việt', desc: 'Văn hóa hiếu thuận' },
                  { title: 'Cá nhân hóa', desc: 'Độc bản cho đôi bạn' },
                  { title: 'Dễ sử dụng', desc: 'Tiện lợi trên mobile' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-line shadow-xs text-center"
                  >
                    <span className="block font-serif text-sm font-semibold text-ink">
                      {item.title}
                    </span>
                    <span className="block text-[11px] text-muted mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICES SECTION (CHĂM CHÚT TRỌN VẸN NGÀY VUI)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-ivory border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Dịch vụ cưới
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-2 mb-3">
              Chăm chút trọn vẹn ngày vui
            </h2>
            <div className="w-12 h-0.5 bg-champagne mx-auto my-3" />
            <p className="text-sm sm:text-base text-muted">
              Các nhóm dịch vụ được chuẩn bị chuyên nghiệp, giúp khách hàng nhanh chóng tìm đúng điều mình cần cho ngày trọng đại.
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plannerServices.map((service: PlannerService) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl p-7 border border-line shadow-luxury-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-full border border-champagne flex items-center justify-center text-gold text-2xl mb-5 group-hover:bg-champagne-light/50 transition-colors">
                    {service.icon}
                  </div>

                  {/* Title & Tag */}
                  <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-moss font-semibold bg-moss/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {service.tag}
                    </span>
                    <h3 className="font-serif text-xl text-ink font-semibold group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted leading-relaxed mb-5 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Deliverables snippet */}
                  <ul className="space-y-1.5 mb-6 text-xs text-muted/90">
                    {service.deliverables.slice(0, 3).map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-gold mt-0.5">✦</span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">
                    {service.priceRange}
                  </span>
                  <button
                    onClick={() => onOpenConsultationModal(service.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-dark group-hover:translate-x-1 transition-all"
                  >
                    <span>Nhận tư vấn</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onSelectTab('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line font-medium text-xs transition-colors"
            >
              <span>Xem chi tiết tất cả các gói dịch vụ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROJECTS & ALBUMS (MỖI ĐÁM CƯỚI LÀ MỘT CÂU CHUYỆN)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-cream/30 border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Dự án và album
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-2">
                Mỗi đám cưới là một câu chuyện
              </h2>
              <div className="w-12 h-0.5 bg-champagne my-3" />
              <p className="text-sm text-muted max-w-lg">
                Thư viện ảnh dạng lưới theo từng phong cách độc bản, kể lại trọn vẹn xúc cảm ngày hạnh phúc.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('projects')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-line text-xs font-semibold text-ink hover:text-gold hover:border-gold transition-colors self-start md:self-auto"
            >
              <span>Xem toàn bộ album</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plannerProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-line shadow-luxury-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
              >
                {/* Photo Aspect Arched Frame */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-ink/75 backdrop-blur-sm text-champagne-light text-xs font-serif italic px-3 py-1 rounded-full border border-champagne/40">
                    Dự án {project.number}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-ink font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gold font-serif italic mb-3">
                      {project.concept}
                    </p>
                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                    <span className="text-muted">{project.clientName}</span>
                    <button
                      onClick={() => onSelectTab('projects')}
                      className="text-gold hover:text-gold-dark font-medium flex items-center gap-1"
                    >
                      <span>Khám phá album</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ONLINE INVITATION SHOWCASE (MỘT TẤM THIỆP, MỘT CÂU CHUYỆN RIÊNG)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-ivory border-b border-line/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Simulated Digital Card Frame */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-b from-[#FFFDF8] to-[#F7F1E8] rounded-3xl p-8 border border-champagne/60 shadow-luxury relative overflow-hidden text-center">
                {/* Gold corner ornaments */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />

                <LotusMark size={56} ring className="mx-auto mb-4" />

                <span className="text-[11px] uppercase tracking-[0.2em] text-muted font-sans block mb-2">
                  Trân trọng kính mời
                </span>

                <h3 className="font-serif text-3xl text-ink font-normal mb-1">
                  Minh Anh & Hoàng Nam
                </h3>

                <p className="font-serif italic text-gold text-xs mb-4">
                  Trân trọng kính mời bạn và gia đình
                </p>

                <div className="w-16 h-px bg-champagne mx-auto mb-4" />

                <div className="py-2.5 px-4 rounded-2xl bg-cream/80 border border-line inline-block mb-4 text-xs font-serif">
                  <span className="text-ink font-medium">Thứ Bảy · 26 tháng 04</span>
                  <span className="text-muted block text-[11px] mt-0.5">
                    Grand Ballroom, JW Marriott Hà Nội
                  </span>
                </div>

                <div className="flex justify-center gap-3 mt-2">
                  <button
                    onClick={onOpenInvitation3D}
                    className="px-5 py-2 rounded-full bg-gold hover:bg-gold-dark text-white font-serif italic text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mở phong bì 3D</span>
                  </button>
                </div>

                <p className="text-[10px] text-muted mt-4 italic">
                  Mẫu nội dung minh họa — có thể thay đổi toàn bộ thông tin.
                </p>
              </div>
            </div>

            {/* Right Column: Features for Couples */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Thiệp cưới trực tuyến
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-2 mb-3">
                Một tấm thiệp, một câu chuyện riêng
              </h2>
              <div className="w-12 h-0.5 bg-champagne my-3" />
              <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
                Khách chọn mẫu, cặp đôi cá nhân hóa nội dung và chia sẻ thiệp bằng đường dẫn riêng hoặc mã QR tiện lợi gửi qua Zalo, Messenger, SMS.
              </p>

              {/* 6 Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                {[
                  {
                    icon: <Layers className="w-4 h-4 text-gold" />,
                    text: 'Chọn mẫu thiệp & xem trước trực tiếp trên điện thoại',
                  },
                  {
                    icon: <Heart className="w-4 h-4 text-gold" />,
                    text: 'Thay tên, ảnh cưới, ngày giờ, địa điểm và lời mời riêng',
                  },
                  {
                    icon: <Music className="w-4 h-4 text-gold" />,
                    text: 'Đếm ngược đến ngày cưới và nhạc nền bật/tắt tinh tế',
                  },
                  {
                    icon: <MapPin className="w-4 h-4 text-gold" />,
                    text: 'Gắn bản đồ Google Maps và tạo mã QR dẫn thẳng đến thiệp',
                  },
                  {
                    icon: <Users className="w-4 h-4 text-gold" />,
                    text: 'Nhận xác nhận tham dự (RSVP) và sổ lưu bút lời chúc',
                  },
                  {
                    icon: <QrCode className="w-4 h-4 text-gold" />,
                    text: 'Quản lý trạng thái xuất bản, đường dẫn và quyền riêng tư',
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-cream/40 border border-line/60"
                  >
                    <div className="mt-0.5 flex-shrink-0">{f.icon}</div>
                    <span className="text-xs text-ink/90 leading-relaxed font-medium">
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenInvitation3D}
                  className="px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Trải Nghiệm Mở Thiệp 3D Ngay</span>
                </button>
                <button
                  onClick={() => onSelectTab('invitations')}
                  className="px-5 py-3 rounded-full bg-white hover:bg-cream border border-line text-ink text-xs font-medium transition-colors"
                >
                  Xem các mẫu thiệp khác
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONSULTATION INVITATION BANNER (FAST BOOKING CTA)
          ========================================================================= */}
      <section className="py-16 bg-gradient-to-r from-[#29251F] via-[#332D24] to-[#29251F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LotusMark size={48} strokeColor="#D5B77A" ring className="mx-auto mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl text-champagne-light font-normal mb-3">
            Sẵn sàng chuẩn bị cho ngày trọng đại của hai bạn?
          </h2>
          <p className="text-sm text-[#D7CABB] max-w-xl mx-auto leading-relaxed mb-8">
            Hãy để Xuân Hiếu Hương Thảo lắng nghe và cùng bạn tạo nên một đám cưới trọn vẹn, thanh lịch và ấm cúng nhất.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultationModal()}
              className="px-7 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-sm shadow-luxury transition-all"
            >
              Đặt Lịch Tư Vấn Trực Tiếp
            </button>
            <button
              onClick={() => onSelectTab('contact')}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all"
            >
              Xem Thông Tin Liên Hệ
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
