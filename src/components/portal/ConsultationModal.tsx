import React, { useState } from 'react'
import { X, CheckCircle2, Calendar, Phone, Mail, User, MapPin, Sparkles } from 'lucide-react'
import { plannerServices, brandInfo } from '../../data/plannerData.ts'
import { LotusMark } from '../common/BrandLogo.tsx'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  initialServiceId?: string
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = '',
}) => {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [selectedService, setSelectedService] = useState(initialServiceId)
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.')
      return
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ để chúng tôi liên hệ.')
      return
    }

    setErrorMsg('')
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFullName('')
    setPhone('')
    setEmail('')
    setWeddingDate('')
    setSelectedService('')
    setLocation('')
    setNotes('')
    setIsSubmitted(false)
    setErrorMsg('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm" onClick={handleReset} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl bg-ivory rounded-3xl shadow-luxury-lg border border-line overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-cream via-ivory to-cream px-6 py-5 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LotusMark size={32} />
            <div>
              <h3 className="font-serif text-lg text-ink font-semibold">
                Đặt Lịch Tư Vấn Ngày Cưới
              </h3>
              <p className="text-xs text-muted">
                Xuân Hiếu Hương Thảo hân hạnh đồng hành cùng hai bạn
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-cream text-muted hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-moss/10 rounded-full flex items-center justify-center text-moss">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl text-ink font-semibold mb-2">
                Đã Tiếp Nhận Yêu Cầu Thành Công!
              </h4>
              <p className="text-muted text-sm max-w-md mx-auto leading-relaxed mb-6">
                Cảm ơn bạn <strong className="text-ink">{fullName}</strong>. Chuyên viên tư vấn của Xuân Hiếu Hương Thảo sẽ liên hệ lại qua số điện thoại <strong className="text-ink">{phone}</strong> trong vòng 24 giờ để lắng nghe và trao đổi chi tiết.
              </p>
              <div className="p-4 bg-cream/70 rounded-2xl border border-line text-xs text-muted mb-6 inline-block text-left">
                <p>✦ Hotline hỗ trợ khẩn cấp: <strong className="text-ink">{brandInfo.hotline}</strong></p>
                <p className="mt-1">✦ Showroom đón tiếp: {brandInfo.address}</p>
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white font-medium text-sm transition-all shadow-sm"
                >
                  Hoàn Tất
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Họ tên & SĐT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A / Lê Thị B"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Số điện thoại liên hệ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Ngày cưới dự kiến */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Email nhận kế hoạch cưới
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Ngày cưới dự kiến
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Dịch vụ quan tâm */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Dịch vụ bạn đang quan tâm nhất
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                >
                  <option value="">-- Chọn dịch vụ cần tư vấn --</option>
                  {plannerServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.title}
                    </option>
                  ))}
                  <option value="all">✦ Trọn gói toàn bộ dịch vụ</option>
                </select>
              </div>

              {/* Địa điểm tổ chức */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Địa điểm tổ chức dự kiến (Khách sạn, tư gia hoặc tỉnh thành)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="VD: Khách sạn Melia Hà Nội, hoặc Tư gia tại Hải Phòng..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              {/* Ghi chú thêm */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Chia sẻ thêm về mong muốn của bạn
                </label>
                <textarea
                  rows={3}
                  placeholder="Phong cách mong muốn, số lượng khách dự kiến hoặc ngân sách ước tính..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold resize-none"
                />
              </div>

              {/* Nút gửi */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-champagne-light" />
                  <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                </button>
                <p className="text-[11px] text-center text-muted mt-2">
                  Thông tin của bạn được cam kết bảo mật theo Chính sách quyền riêng tư.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
