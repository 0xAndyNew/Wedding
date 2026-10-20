import React, { useState } from 'react'
import { CheckCircle2, Sparkles, Calendar } from 'lucide-react'
import { plannerServices, PlannerService } from '../../data/plannerData.ts'
import { LotusMark } from '../common/BrandLogo.tsx'
import { PortalNavTab } from './PortalHeader.tsx'

interface ServicesPageProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenConsultationModal: (serviceId?: string) => void
  onOpenInvitation3D: () => void
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectTab,
  onOpenConsultationModal,
  onOpenInvitation3D,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredServices =
    selectedCategory === 'all'
      ? plannerServices
      : plannerServices.filter((s) => s.id === selectedCategory)

  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Danh sách dịch vụ
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal mt-3 mb-4">
            Dịch vụ cưới cao cấp & độc bản
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-base text-muted leading-relaxed">
            Từ khâu lên ý tưởng đầu tiên, dàn dựng không gian đến công nghệ thiệp cưới 3D và điều phối chuyên nghiệp trong ngày cưới.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-gold text-white shadow-sm'
                : 'bg-white text-muted hover:text-ink border border-line'
            }`}
          >
            Tất cả dịch vụ ({plannerServices.length})
          </button>
          {plannerServices.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setSelectedCategory(svc.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === svc.id
                  ? 'bg-gold text-white shadow-sm'
                  : 'bg-white text-muted hover:text-ink border border-line'
              }`}
            >
              {svc.icon} {svc.title}
            </button>
          ))}
        </div>

        {/* Services Detail List */}
        <div className="space-y-16 max-w-6xl mx-auto mb-20">
          {filteredServices.map((service: PlannerService, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-line shadow-luxury-sm hover:shadow-luxury transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Image Aspect Column */}
                <div
                  className={`lg:col-span-5 relative h-72 lg:h-auto min-h-[320px] overflow-hidden ${
                    !isEven ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-ink/75 backdrop-blur-sm text-champagne-light text-xs font-serif px-3.5 py-1.5 rounded-full border border-champagne/40 flex items-center gap-1.5">
                    <span>{service.icon}</span>
                    <span>{service.tag}</span>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between ${
                    !isEven ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                        Gói Dịch Vụ
                      </span>
                      <span className="font-serif text-sm font-semibold text-ink bg-cream px-3 py-1 rounded-full border border-line">
                        {service.priceRange}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold mb-1">
                      {service.title}
                    </h3>

                    <p className="font-serif italic text-xs text-gold mb-4">
                      {service.subtitle}
                    </p>

                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="bg-cream/40 rounded-2xl p-5 border border-line/60 mb-6">
                      <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-3">
                        Chi tiết các hạng mục bàn giao:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-moss flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-line/60">
                    <button
                      onClick={() => onOpenConsultationModal(service.id)}
                      className="px-5 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white font-medium text-xs shadow-sm transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Nhận Báo Giá & Tư Vấn</span>
                    </button>

                    {service.id === 'thiep-cuoi-truc-tuyen' && (
                      <button
                        onClick={onOpenInvitation3D}
                        className="px-5 py-2.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line font-medium text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span>Mở Xem Mẫu Thiệp 3D</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-line text-center max-w-4xl mx-auto shadow-luxury-sm">
          <LotusMark size={40} className="mx-auto mb-3" />
          <h3 className="font-serif text-2xl text-ink font-semibold mb-2">
            Cần Một Gói Dịch Vụ Thiết Kế Riêng Theo Yêu Cầu?
          </h3>
          <p className="text-sm text-muted max-w-lg mx-auto mb-6">
            Chúng tôi luôn sẵn sàng linh hoạt tùy biến các hạng mục theo ngân sách và mong muốn cụ thể của hai bạn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultationModal('thiet-ke-theo-yeu-cau')}
              className="px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-xs shadow-md transition-all"
            >
              Trao Đổi Ý Tưởng Cùng Chuyên Gia
            </button>
            <button
              onClick={() => onSelectTab('process')}
              className="px-6 py-3 rounded-full bg-white hover:bg-ivory border border-line text-ink font-medium text-xs transition-colors"
            >
              Xem quy trình tổ chức cưới 4 bước →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
