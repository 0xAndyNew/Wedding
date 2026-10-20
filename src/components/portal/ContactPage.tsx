import React, { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react'
import { brandInfo, plannerServices } from '../../data/plannerData.ts'
import { LotusMark } from '../common/BrandLogo.tsx'
import { PortalNavTab } from './PortalHeader.tsx'

interface ContactPageProps {
  onSelectTab: (tab: PortalNavTab) => void
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSelectTab }) => {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const [budget, setBudget] = useState('')
  const [notes, setNotes] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.')
      return
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 9) {
      setErrorMsg('Vui lòng cung cấp số điện thoại chính xác để tiện liên hệ.')
      return
    }

    setErrorMsg('')
    setIsSuccess(true)
  }

  const handleReset = () => {
    setFullName('')
    setPhone('')
    setEmail('')
    setWeddingDate('')
    setService('')
    setLocation('')
    setBudget('')
    setNotes('')
    setIsSuccess(false)
  }

  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Liên hệ & Đặt lịch tư vấn
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal mt-3 mb-4">
            Bắt đầu hành trình ngày cưới cùng chúng tôi
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-base text-muted leading-relaxed">
            Để lại thông tin bên dưới hoặc ghé thăm trực tiếp không gian showroom của Xuân Hiếu Hương Thảo để cùng nhau biến đám cưới trong mơ thành hiện thực.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto mb-20">
          {/* Left: Contact Info & Showroom */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-8 border border-line shadow-luxury-sm">
              <LotusMark size={48} ring className="mb-6" />

              <h3 className="font-serif text-2xl text-ink font-semibold mb-2">
                Showroom & Văn Phòng
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                Không gian tiếp khách trà đạo trang nhã và trưng bày mẫu hoa, chất liệu thiệp cưới trực quan.
              </p>

              <div className="space-y-4 text-sm text-ink/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink text-xs uppercase tracking-wider mb-0.5">
                      Địa chỉ:
                    </strong>
                    <span>{brandInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink text-xs uppercase tracking-wider mb-0.5">
                      Hotline tư vấn 24/7:
                    </strong>
                    <a href={`tel:${brandInfo.hotline}`} className="hover:text-gold block font-semibold">
                      {brandInfo.hotline}
                    </a>
                    <a href={`tel:${brandInfo.hotlineSecondary}`} className="hover:text-gold block text-xs text-muted">
                      {brandInfo.hotlineSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink text-xs uppercase tracking-wider mb-0.5">
                      Email tiếp nhận yêu cầu:
                    </strong>
                    <a href={`mailto:${brandInfo.email}`} className="hover:text-gold">
                      {brandInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink text-xs uppercase tracking-wider mb-0.5">
                      Giờ đón tiếp:
                    </strong>
                    <span>{brandInfo.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note badge */}
            <div className="mt-6 p-6 bg-cream rounded-3xl border border-line text-xs text-muted leading-relaxed">
              <p className="font-serif italic text-ink font-medium mb-1">
                ✦ Lưu ý dành cho các cặp đôi:
              </p>
              <p>
                Để đội ngũ Wedding Planner chuẩn bị chu đáo nhất, quý khách vui lòng đặt lịch trước tối thiểu 02 tiếng trước khi đến showroom.
              </p>
            </div>
          </div>

          {/* Right: Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-line shadow-luxury-sm">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-moss/10 rounded-full flex items-center justify-center text-moss">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl text-ink font-semibold mb-2">
                    Gửi Yêu Cầu Thành Công!
                  </h3>
                  <p className="text-muted text-sm max-w-md mx-auto leading-relaxed mb-6">
                    Cảm ơn bạn <strong className="text-ink">{fullName}</strong> đã tin tưởng Xuân Hiếu Hương Thảo. Chúng tôi sẽ liên hệ lại qua số <strong className="text-ink">{phone}</strong> sớm nhất có thể.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white font-medium text-xs transition-all shadow-sm"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl text-ink font-semibold mb-1">
                    Gửi Yêu Cầu Tư Vấn Ngày Cưới
                  </h3>
                  <p className="text-xs text-muted mb-4">
                    Vui lòng điền thông tin để chuyên viên chuẩn bị bảng dự toán và gợi ý concept phù hợp nhất.
                  </p>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Họ tên & SĐT */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  {/* Email & Ngày cưới */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Ngày cưới dự kiến
                      </label>
                      <input
                        type="date"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  {/* Dịch vụ & Ngân sách */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Gói dịch vụ quan tâm
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option value="">-- Chọn gói dịch vụ --</option>
                        {plannerServices.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.icon} {s.title}
                          </option>
                        ))}
                        <option value="all">✦ Trọn gói toàn bộ dịch vụ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Ngân sách dự trù (ước tính)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option value="">-- Mức ngân sách dự kiến --</option>
                        <option value="under-50m">Dưới 50 triệu VNĐ</option>
                        <option value="50m-100m">50 triệu – 100 triệu VNĐ</option>
                        <option value="100m-200m">100 triệu – 200 triệu VNĐ</option>
                        <option value="over-200m">Trên 200 triệu VNĐ</option>
                      </select>
                    </div>
                  </div>

                  {/* Địa điểm */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Địa điểm tổ chức dự kiến (Tư gia hoặc Tên nhà hàng/Khách sạn)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Khách sạn Lotte Hà Nội..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Những điều bạn muốn chúng tôi lưu tâm
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Số lượng khách mời, tông màu yêu thích hoặc ý tưởng đặc biệt của bạn..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Gửi Thông Tin Hẹn Lịch Tư Vấn</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
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
