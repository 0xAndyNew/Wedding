import React from 'react'
import { CheckCircle2, Clock, Sparkles } from 'lucide-react'
import { processSteps } from '../../data/plannerData.ts'
import { PortalNavTab } from './PortalHeader.tsx'

interface ProcessPageProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenConsultationModal: () => void
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  onSelectTab,
  onOpenConsultationModal,
}) => {
  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Đội ngũ & Quy trình
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal mt-3 mb-4">
            Quy trình làm việc minh bạch & chuẩn mực
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-base text-muted leading-relaxed">
            Chúng tôi xây dựng quy trình 4 giai đoạn rõ ràng, giúp cô dâu chú rể hoàn toàn thảnh thơi, không còn lo âu hay áp lực trong suốt quá trình chuẩn bị cưới.
          </p>
        </div>

        {/* 4 Process Steps Timeline */}
        <div className="space-y-12 max-w-5xl mx-auto mb-20">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-line shadow-luxury-sm hover:shadow-luxury transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Step Number Watermark */}
              <div className="absolute right-4 top-2 text-8xl font-serif font-bold text-cream select-none pointer-events-none opacity-80">
                {step.step}
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Step Info */}
                <div className="md:col-span-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-light text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Thời gian: {step.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-ink font-semibold mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gold font-serif italic mb-4">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Key Activities List */}
                <div className="md:col-span-7 bg-cream/50 rounded-2xl p-6 border border-line/60">
                  <h4 className="font-serif text-sm font-semibold text-ink uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Các hạng mục chính sẽ thực hiện:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {step.activities.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 text-xs text-ink/85">
                        <CheckCircle2 className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Câu hỏi thường gặp
            </span>
            <h3 className="font-serif text-2xl text-ink font-semibold mt-1">
              Thắc mắc thường gặp của các cặp đôi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Nên liên hệ đặt dịch vụ Wedding Planner trước bao lâu?',
                a: 'Thời điểm lý tưởng nhất là từ 6 đến 9 tháng trước ngày cưới để có đủ thời gian chọn địa điểm đẹp, lên ý tưởng concept độc đáo và tối ưu ngân sách tốt nhất.',
              },
              {
                q: 'Nếu chúng tôi đã tự chọn được địa điểm thì có dùng dịch vụ được không?',
                a: 'Hoàn toàn được. Chúng tôi sẽ khảo sát trực tiếp không gian địa điểm của bạn để thiết kế trang trí và điều phối ăn khớp với quy định của nơi tổ chức.',
              },
              {
                q: 'Chi phí thanh toán được chia làm mấy đợt?',
                a: 'Thông thường được chia thành 3 đợt: Đặt cọc giữ ngày (30%), Duyệt bản vẽ 3D chi tiết (40%), và Tất toán sau khi kết thúc tiệc cưới trọn vẹn (30%).',
              },
              {
                q: 'Thiệp cưới 3D có gửi được qua Zalo hay Facebook không?',
                a: 'Có, mỗi cặp đôi sẽ có một đường dẫn riêng (link) và mã QR độc quyền, khách mời chỉ cần bấm vào là mở xem mượt mà trên cả iPhone và Android mà không cần cài app.',
              },
            ].map((faq, fIdx) => (
              <div key={fIdx} className="bg-white p-6 rounded-2xl border border-line shadow-xs">
                <h4 className="font-serif text-sm font-semibold text-ink mb-2 flex items-start gap-2">
                  <span className="text-gold font-bold">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-muted leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            onClick={onOpenConsultationModal}
            className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-sm shadow-luxury transition-all"
          >
            Bắt Đầu Lên Kế Hoạch Cho Ngày Vui
          </button>
          <button
            onClick={() => onSelectTab('services')}
            className="px-6 py-3.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line text-xs font-semibold transition-colors"
          >
            Xem danh mục dịch vụ chi tiết →
          </button>
        </div>
      </div>
    </div>
  )
}
