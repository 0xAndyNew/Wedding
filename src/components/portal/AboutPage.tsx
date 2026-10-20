import React from 'react'
import { Heart, Award } from 'lucide-react'
import { LotusMark } from '../common/BrandLogo.tsx'
import { teamMembers } from '../../data/plannerData.ts'
import { PortalNavTab } from './PortalHeader.tsx'

interface AboutPageProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenConsultationModal: () => void
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectTab,
  onOpenConsultationModal,
}) => {
  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb / Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Giới thiệu thương hiệu
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal mt-3 mb-4">
            Hạnh phúc bắt đầu từ những điều được chăm chút
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-base text-muted leading-relaxed">
            Xuân Hiếu Hương Thảo mang sứ mệnh đồng hành cùng các cặp đôi người Việt kiến tạo nên một lễ cưới trang nhã, giàu cảm xúc và mang đậm dấu ấn riêng của gia đình.
          </p>
        </div>

        {/* Narrative & Lotus Meaning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-cream rounded-3xl p-10 border border-line shadow-luxury text-center max-w-sm w-full relative">
              <LotusMark size={140} ring strokeColor="#B58A45" className="mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-ink font-medium tracking-wide">
                Ý Nghĩa Biểu Trưng Hoa Sen
              </h3>
              <p className="text-xs text-muted mt-3 leading-relaxed">
                Biểu trưng hoa sen với những đường nét mềm mại uốn lượn tượng trưng cho sự thuần khiết, thanh cao và tình yêu đôi lứa thủy chung, bền chặt theo năm tháng.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold mb-4">
              Sự hòa quyện giữa tinh thần hiện đại và hồn cốt văn hóa Việt
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
              Tại <strong>Xuân Hiếu Hương Thảo</strong>, chúng tôi tin rằng một đám cưới đẹp không chỉ ở hoa tươi hay ánh sáng lộng lẫy, mà quan trọng hơn cả là sự ấm áp, hiếu thuận và cảm giác kết nối sâu sắc giữa hai bên dòng họ.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
              Chúng tôi trân trọng gìn giữ các giá trị truyền thống như lễ rước dâu, lễ gia tiên, trà đạo đón khách, đồng thời thổi vào đó làn gió mới với phong cách thiết kế <em>Luxury Champagne</em> hiện đại, sang trọng và phóng khoáng.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-line">
                <Award className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-ink">Tiêu Chuẩn 5 Sao</h4>
                  <p className="text-xs text-muted mt-0.5">Quy trình làm việc nghiêm ngặt và đối tác cung ứng cao cấp.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-line">
                <Heart className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-ink">Tận Tâm Đồng Hành</h4>
                  <p className="text-xs text-muted mt-0.5">Lắng nghe và sát cánh cùng cô dâu chú rể từng ngày.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Đội ngũ chuyên gia
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mt-2">
              Những người đồng hành tâm huyết
            </h2>
            <div className="w-12 h-0.5 bg-champagne mx-auto my-3" />
            <p className="text-sm text-muted">
              Đội ngũ chuyên viên giàu kinh nghiệm, yêu nghề và luôn đặt sự hài lòng của gia đình lên hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-line shadow-luxury-sm hover:shadow-luxury transition-all text-center flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-ink">{member.name}</h3>
                    <p className="text-xs text-gold font-medium uppercase tracking-wider mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-muted leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-line text-center max-w-4xl mx-auto shadow-luxury-sm">
          <LotusMark size={40} className="mx-auto mb-3" />
          <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold mb-2">
            Cùng Trò Chuyện Về Đám Cưới Của Hai Bạn
          </h3>
          <p className="text-sm text-muted max-w-lg mx-auto mb-6">
            Ghé thăm showroom của chúng tôi để thưởng trà và chia sẻ về những ý tưởng đầu tiên cho ngày vui trọng đại.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenConsultationModal}
              className="px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-xs shadow-md transition-all"
            >
              Đặt Lịch Hẹn Tư Vấn
            </button>
            <button
              onClick={() => onSelectTab('process')}
              className="px-6 py-3 rounded-full bg-white hover:bg-ivory border border-line text-ink font-medium text-xs transition-colors"
            >
              Tìm hiểu quy trình làm việc →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
