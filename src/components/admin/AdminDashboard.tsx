import React, { useState, useRef } from 'react'
import {
  Users,
  Image as ImageIcon,
  MessageSquare,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  X,
  Search,
  Sparkles,
  LayoutDashboard,
  Mail,
  ListOrdered,
  Layers,
  Settings,
  FileSpreadsheet,
  Check,
  Ban,
  ExternalLink,
  Smartphone,
  Monitor,
} from 'lucide-react'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import { ImageUploadField } from './ImageUploadField.tsx'
import { LotusMark } from '../common/BrandLogo.tsx'
import { brandInfo, plannerServices } from '../../data/plannerData.ts'

interface AdminDashboardProps {
  isOpen: boolean
  onClose: () => void
  onOpenInvitationPreview?: () => void
}

type AdminTab =
  | 'overview'
  | 'couples'
  | 'invitations'
  | 'guests'
  | 'wishes'
  | 'gallery'
  | 'content'
  | 'settings'

interface SampleCoupleItem {
  id: string
  names: string
  weddingDate: string
  venue: string
  status: 'published' | 'draft' | 'pending'
  guestCount: number
  template: string
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onOpenInvitationPreview,
}) => {
  const {
    state,
    updateCouple,
    addGalleryPhoto,
    deleteGalleryPhoto,
    deleteRsvp,
    deleteWish,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
    exportRsvpsToCsv,
  } = useWeddingData()

  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [saveToast, setSaveToast] = useState(false)
  const [rsvpSearch, setRsvpSearch] = useState('')
  const [rsvpFilterSide, setRsvpFilterSide] = useState<'all' | 'groom' | 'bride' | 'mutual'>('all')
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile')

  // Sample couples list from Section 9 of design file
  const [coupleList, setCoupleList] = useState<SampleCoupleItem[]>([
    {
      id: 'c-1',
      names: 'Minh Anh – Hoàng Nam',
      weddingDate: '26/04/2027',
      venue: 'JW Marriott Hotel Hanoi',
      status: 'published',
      guestCount: 350,
      template: 'Champagne Royal 3D',
    },
    {
      id: 'c-2',
      names: 'Thu Hà – Đức Minh',
      weddingDate: '15/05/2027',
      venue: 'Riverside Garden Estate',
      status: 'draft',
      guestCount: 200,
      template: 'Vườn Hoa Thơ Mộng',
    },
    {
      id: 'c-3',
      names: 'Phương Linh – Quốc Bảo',
      weddingDate: '08/06/2027',
      venue: 'Tư gia Hoàng Thành',
      status: 'pending',
      guestCount: 180,
      template: 'Sen Vàng Truyền Thống',
    },
    {
      id: 'c-4',
      names: `${state.couple.groom.shortName} – ${state.couple.bride.shortName}`,
      weddingDate: '20/11/2026',
      venue: 'Riverside Palace',
      status: 'published',
      guestCount: 280,
      template: 'Champagne Royal 3D',
    },
  ])

  // New photo form state
  const [newPhotoTitle, setNewPhotoTitle] = useState('')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newPhotoCategory, setNewPhotoCategory] = useState<'ceremony' | 'outdoor' | 'moments'>('ceremony')
  const [newPhotoAspect, setNewPhotoAspect] = useState<'tall' | 'wide' | 'square'>('wide')
  const [newPhotoCaption, setNewPhotoCaption] = useState('')

  // New couple modal state
  const [showAddCoupleModal, setShowAddCoupleModal] = useState(false)
  const [newCoupleGroom, setNewCoupleGroom] = useState('')
  const [newCoupleBride, setNewCoupleBride] = useState('')
  const [newCoupleDate, setNewCoupleDate] = useState('')
  const [newCoupleVenue, setNewCoupleVenue] = useState('')

  // Moderated wishes status tracker
  const [approvedWishes, setApprovedWishes] = useState<Record<string, boolean>>({
    'wish-1': true,
    'wish-2': true,
  })

  const jsonInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSave = () => {
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 3000)
  }

  const handleResetDefaults = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ dữ liệu mẫu ban đầu? Những chỉnh sửa chưa lưu sẽ bị xóa.')) {
      resetToDefaults()
      alert('Đã khôi phục dữ liệu mẫu gốc thành công!')
    }
  }

  const handleExportJson = () => {
    const jsonStr = exportDataAsJson()
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sao_luu_xuan_hieu_huong_thao_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (importDataFromJson(content)) {
        alert('Khôi phục dữ liệu từ file JSON thành công!')
      } else {
        alert('File JSON không hợp lệ!')
      }
    }
    reader.readAsText(file)
  }

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) {
      alert('Vui lòng chọn hình ảnh và nhập tiêu đề ảnh!')
      return
    }

    addGalleryPhoto({
      title: newPhotoTitle.trim(),
      url: newPhotoUrl.trim(),
      category: newPhotoCategory,
      aspectRatio: newPhotoAspect,
      caption: newPhotoCaption.trim() || undefined,
    })

    setNewPhotoTitle('')
    setNewPhotoUrl('')
    setNewPhotoCaption('')
    alert('Đã thêm ảnh vào Album thành công!')
  }

  const handleCreateCouple = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCoupleGroom.trim() || !newCoupleBride.trim()) {
      alert('Vui lòng điền đủ tên cô dâu và chú rể!')
      return
    }

    const newCouple: SampleCoupleItem = {
      id: `c-${Date.now()}`,
      names: `${newCoupleGroom.trim()} – ${newCoupleBride.trim()}`,
      weddingDate: newCoupleDate || 'Chưa định ngày',
      venue: newCoupleVenue || 'Chưa chọn địa điểm',
      status: 'draft',
      guestCount: 0,
      template: 'Champagne Royal 3D',
    }

    setCoupleList([newCouple, ...coupleList])
    setNewCoupleGroom('')
    setNewCoupleBride('')
    setNewCoupleDate('')
    setNewCoupleVenue('')
    setShowAddCoupleModal(false)
    alert('Đã tạo hồ sơ cặp đôi mới thành công!')
  }

  const toggleWishApproval = (wishId: string) => {
    setApprovedWishes((prev) => ({
      ...prev,
      [wishId]: !prev[wishId],
    }))
  }

  // RSVP Stats
  const totalRsvps = state.rsvps.length
  const totalAttending = state.rsvps.filter((r) => r.attendance === 'yes').length
  const totalGuests = state.rsvps
    .filter((r) => r.attendance === 'yes')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0)

  const filteredRsvps = state.rsvps.filter((r) => {
    const matchSearch =
      r.fullName.toLowerCase().includes(rsvpSearch.toLowerCase()) ||
      r.phone.includes(rsvpSearch) ||
      (r.dietaryNotes && r.dietaryNotes.toLowerCase().includes(rsvpSearch.toLowerCase()))
    const matchSide = rsvpFilterSide === 'all' || r.side === rsvpFilterSide
    return matchSearch && matchSide
  })

  // Pending wishes count
  const pendingWishesCount = state.wishes.filter((w) => !approvedWishes[w.id]).length

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bảng quản trị Xuân Hiếu Hương Thảo"
      className="fixed inset-0 z-50 flex bg-[#FAF6F0] text-ink select-none overflow-hidden"
    >
      {/* =========================================================================
          LEFT SIDEBAR (THEO MẪU SECTION 9 CỦA FILE HTML)
          ========================================================================= */}
      <aside className="w-64 bg-[#29251F] text-white flex flex-col justify-between border-r border-line/20 flex-shrink-0 hidden md:flex">
        <div>
          {/* Brand Emblem in Sidebar */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3">
            <LotusMark size={36} strokeColor="#D5B77A" ring />
            <div>
              <h2 className="font-serif text-sm tracking-widest font-semibold uppercase text-white leading-tight">
                Xuân Hiếu Hương Thảo
              </h2>
              <span className="text-[10px] text-champagne-light uppercase tracking-wider block mt-0.5">
                Admin Control Portal
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {[
              { id: 'overview', label: '▦ Tổng quan', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'couples', label: '♡ Cặp đôi', icon: <Users className="w-4 h-4" /> },
              { id: 'invitations', label: '✉ Thiệp cưới', icon: <Mail className="w-4 h-4" /> },
              { id: 'guests', label: '☷ Khách mời & RSVP', icon: <ListOrdered className="w-4 h-4" /> },
              {
                id: 'wishes',
                label: '♡ Lời chúc',
                icon: <MessageSquare className="w-4 h-4" />,
                badge: pendingWishesCount > 0 ? pendingWishesCount : undefined,
              },
              { id: 'gallery', label: '▧ Album ảnh', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'content', label: '▤ Dịch vụ & Nội dung', icon: <Layers className="w-4 h-4" /> },
              { id: 'settings', label: '⚙ Cài đặt', icon: <Settings className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-gold text-white font-semibold shadow-sm'
                    : 'text-[#D7CABB] hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleExportJson}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs text-[#D7CABB] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-champagne" />
            <span>Sao lưu dữ liệu JSON</span>
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
          >
            <span>Thoát Bảng Quản Trị</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN CONTENT AREA
          ========================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-ivory">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-line px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <LotusMark size={28} />
            </div>
            <div>
              <h1 className="font-serif text-lg font-semibold text-ink">
                {activeTab === 'overview' && '▦ Tổng quan hoạt động'}
                {activeTab === 'couples' && '♡ Quản lý hồ sơ cặp đôi'}
                {activeTab === 'invitations' && '✉ Quản lý mẫu thiệp & xem trước'}
                {activeTab === 'guests' && '☷ Quản lý khách mời & xác nhận tham dự'}
                {activeTab === 'wishes' && '♡ Quản lý và duyệt sổ lưu bút lời chúc'}
                {activeTab === 'gallery' && '▧ Quản lý album ảnh cưới'}
                {activeTab === 'content' && '▤ Quản lý dịch vụ & bài viết'}
                {activeTab === 'settings' && '⚙ Cài đặt hệ thống & thương hiệu'}
              </h1>
              <p className="text-[11px] text-muted hidden sm:block">
                Hệ thống quản trị dịch vụ cưới & thiệp trực tuyến Xuân Hiếu Hương Thảo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Indicator */}
            {saveToast && (
              <span className="text-xs text-moss flex items-center gap-1 font-semibold animate-pulse">
                <Check className="w-3.5 h-3.5" /> Đã lưu thành công!
              </span>
            )}

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full bg-gold hover:bg-gold-dark text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lưu Thay Đổi</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-cream text-muted hover:text-ink transition-colors"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F7F1E8]/40">
          {/* =========================================================================
              TAB: TỔNG QUAN (OVERVIEW - TƯƠNG ĐƯƠNG SECTION 9 FILE HTML)
              ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Welcome message */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-ink font-semibold">
                    Chào mừng bạn trở lại, Quản Trị Viên!
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Đây là tình hình hoạt động tổng quan của hệ thống website hôm nay.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddCoupleModal(true)}
                  className="px-4 py-2 rounded-full bg-gold text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-gold-dark"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tạo hồ sơ cặp đôi mới</span>
                </button>
              </div>

              {/* 4 KPI Cards from Section 9 of HTML */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium block">
                    Cặp đôi
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl text-ink font-bold mt-2 block">
                    24
                  </span>
                  <span className="text-[11px] text-moss mt-1 flex items-center gap-1">
                    ✦ Hồ sơ mẫu đang quản lý
                  </span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium block">
                    Thiệp cưới
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl text-gold font-bold mt-2 block">
                    18
                  </span>
                  <span className="text-[11px] text-moss mt-1 flex items-center gap-1">
                    ✦ Đã xuất bản trực tuyến
                  </span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium block">
                    Khách xác nhận
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl text-ink font-bold mt-2 block">
                    276
                  </span>
                  <span className="text-[11px] text-moss mt-1 flex items-center gap-1">
                    ✦ Lượt phản hồi tham dự
                  </span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium block">
                    Lời chúc
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl text-moss font-bold mt-2 block">
                    12
                  </span>
                  <span className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                    ✦ Chờ duyệt hiển thị
                  </span>
                </div>
              </div>

              {/* Recent Invitations Table (from Section 9 of HTML) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-ink">
                      Thiệp cưới cập nhật gần đây
                    </h3>
                    <p className="text-xs text-muted">
                      Danh sách các thiệp cưới được tạo và phát hành gần nhất trên hệ thống
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('couples')}
                    className="text-xs text-gold font-semibold hover:underline"
                  >
                    Xem tất cả →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line text-muted uppercase tracking-wider text-[11px]">
                        <th className="pb-3 font-semibold">Cặp đôi</th>
                        <th className="pb-3 font-semibold">Ngày cưới</th>
                        <th className="pb-3 font-semibold">Địa điểm</th>
                        <th className="pb-3 font-semibold">Mẫu thiệp</th>
                        <th className="pb-3 font-semibold">Trạng thái</th>
                        <th className="pb-3 font-semibold text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {coupleList.map((couple) => (
                        <tr key={couple.id} className="hover:bg-cream/40 transition-colors">
                          <td className="py-4 font-serif font-semibold text-sm text-ink">
                            {couple.names}
                          </td>
                          <td className="py-4 text-muted">{couple.weddingDate}</td>
                          <td className="py-4 text-muted">{couple.venue}</td>
                          <td className="py-4">
                            <span className="px-2 py-0.5 rounded-full bg-cream text-ink text-[10px] border border-line">
                              {couple.template}
                            </span>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                                couple.status === 'published'
                                  ? 'bg-moss/10 text-moss border border-moss/20'
                                  : couple.status === 'draft'
                                  ? 'bg-gray-100 text-muted border border-gray-200'
                                  : 'bg-amber-50 text-amber-600 border border-amber-200'
                              }`}
                            >
                              {couple.status === 'published' && 'Đã xuất bản'}
                              {couple.status === 'draft' && 'Bản nháp'}
                              {couple.status === 'pending' && 'Chờ duyệt'}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => {
                                if (onOpenInvitationPreview) {
                                  onClose()
                                  onOpenInvitationPreview()
                                } else {
                                  setActiveTab('invitations')
                                }
                              }}
                              className="text-gold hover:text-gold-dark font-medium inline-flex items-center gap-1"
                            >
                              <span>Xem thiệp</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: CẶP ĐÔI (COUPLES)
              ========================================================================= */}
          {activeTab === 'couples' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-ink">
                    Hồ Sơ Cặp Đôi Đang Kích Hoạt
                  </h3>
                  <p className="text-xs text-muted">
                    Chỉnh sửa thông tin chi tiết của cô dâu và chú rể đang hiển thị trên thiệp mẫu
                  </p>
                </div>
                <button
                  onClick={() => setShowAddCoupleModal(true)}
                  className="px-4 py-2 rounded-full bg-gold text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-gold-dark self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Cặp Đôi Mới</span>
                </button>
              </div>

              {/* Edit Couple Profile Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Chú Rể */}
                  <div className="space-y-4 p-5 rounded-2xl bg-cream/30 border border-line">
                    <h4 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                      <span>🤵 Thông tin Chú Rể</span>
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Họ và tên</label>
                      <input
                        type="text"
                        value={state.couple.groom.fullName}
                        onChange={(e) =>
                          updateCouple({
                            groom: { ...state.couple.groom, fullName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Tên thường gọi</label>
                      <input
                        type="text"
                        value={state.couple.groom.shortName}
                        onChange={(e) =>
                          updateCouple({
                            groom: { ...state.couple.groom, shortName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Song thân phụ mẫu</label>
                      <input
                        type="text"
                        value={state.couple.groom.parents}
                        onChange={(e) =>
                          updateCouple({
                            groom: { ...state.couple.groom, parents: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Tiểu sử ngắn</label>
                      <textarea
                        rows={2}
                        value={state.couple.groom.bio}
                        onChange={(e) =>
                          updateCouple({
                            groom: { ...state.couple.groom, bio: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl resize-none"
                      />
                    </div>
                    <ImageUploadField
                      label="Ảnh chân dung chú rể"
                      value={state.couple.groom.image}
                      onChange={(img) =>
                        updateCouple({
                          groom: { ...state.couple.groom, image: img },
                        })
                      }
                      aspectRatioClass="aspect-[3/4]"
                    />
                  </div>

                  {/* Cô Dâu */}
                  <div className="space-y-4 p-5 rounded-2xl bg-cream/30 border border-line">
                    <h4 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                      <span>👰 Thông tin Cô Dâu</span>
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Họ và tên</label>
                      <input
                        type="text"
                        value={state.couple.bride.fullName}
                        onChange={(e) =>
                          updateCouple({
                            bride: { ...state.couple.bride, fullName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Tên thường gọi</label>
                      <input
                        type="text"
                        value={state.couple.bride.shortName}
                        onChange={(e) =>
                          updateCouple({
                            bride: { ...state.couple.bride, shortName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Song thân phụ mẫu</label>
                      <input
                        type="text"
                        value={state.couple.bride.parents}
                        onChange={(e) =>
                          updateCouple({
                            bride: { ...state.couple.bride, parents: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Tiểu sử ngắn</label>
                      <textarea
                        rows={2}
                        value={state.couple.bride.bio}
                        onChange={(e) =>
                          updateCouple({
                            bride: { ...state.couple.bride, bio: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl resize-none"
                      />
                    </div>
                    <ImageUploadField
                      label="Ảnh chân dung cô dâu"
                      value={state.couple.bride.image}
                      onChange={(img) =>
                        updateCouple({
                          bride: { ...state.couple.bride, image: img },
                        })
                      }
                      aspectRatioClass="aspect-[3/4]"
                    />
                  </div>
                </div>

                {/* Common Wedding Date & Quote */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-line">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Ngày giờ cưới chính thức (Đếm ngược)
                    </label>
                    <input
                      type="datetime-local"
                      value={state.couple.weddingDate.slice(0, 16)}
                      onChange={(e) => updateCouple({ weddingDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Chữ lồng Monogram
                    </label>
                    <input
                      type="text"
                      value={state.couple.monogram}
                      onChange={(e) => updateCouple({ monogram: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Câu danh ngôn tình yêu (Wedding Quote)
                    </label>
                    <textarea
                      rows={2}
                      value={state.couple.quote}
                      onChange={(e) => updateCouple({ quote: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white text-xs font-semibold shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu thông tin cặp đôi</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: THIỆP CƯỚI (INVITATIONS & PREVIEW)
              ========================================================================= */}
          {activeTab === 'invitations' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      Quản Lý & Tùy Chỉnh Thiệp Cưới
                    </h3>
                    <p className="text-xs text-muted">
                      Xem trước trên điện thoại/máy tính, bật tắt trạng thái xuất bản và mã QR
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 border ${
                        previewDevice === 'mobile'
                          ? 'bg-gold text-white border-gold'
                          : 'bg-white text-muted border-line'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile</span>
                    </button>
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 border ${
                        previewDevice === 'desktop'
                          ? 'bg-gold text-white border-gold'
                          : 'bg-white text-muted border-line'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                      <span>Desktop</span>
                    </button>
                  </div>
                </div>

                {/* Status Switcher & Link */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-line">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Trạng thái phát hành
                    </label>
                    <select className="w-full px-3 py-2 text-xs bg-cream/40 border border-line rounded-xl">
                      <option value="published">✦ Đã xuất bản (Công khai)</option>
                      <option value="draft">✦ Bản nháp (Riêng tư)</option>
                      <option value="hidden">✦ Đã ẩn sau lễ cưới</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Mẫu giao diện áp dụng
                    </label>
                    <select className="w-full px-3 py-2 text-xs bg-cream/40 border border-line rounded-xl">
                      <option value="3d-royal">Champagne Royal 3D (Bao thư sáp)</option>
                      <option value="sen-vang">Sen Vàng Cung Đình</option>
                      <option value="garden">Vườn Hoa Thơ Mộng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Đường dẫn chia sẻ thiệp
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`https://xuanhieuhuongthao.vn/#invitation`}
                        className="w-full px-3 py-2 text-xs bg-cream/20 border border-line rounded-xl text-muted font-mono"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('https://xuanhieuhuongthao.vn/#invitation')
                          alert('Đã sao chép link thiệp vào bộ nhớ tạm!')
                        }}
                        className="px-3 py-2 rounded-xl bg-gold text-white text-xs font-medium flex-shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview Frame */}
                <div className="py-8 flex justify-center bg-cream/30 rounded-2xl my-6">
                  <div
                    className={`transition-all duration-300 bg-white rounded-3xl border-4 border-line shadow-2xl p-6 text-center ${
                      previewDevice === 'mobile' ? 'w-[360px] min-h-[500px]' : 'w-full max-w-2xl min-h-[400px]'
                    }`}
                  >
                    <div className="w-8 h-1 bg-line rounded-full mx-auto mb-6" />
                    <LotusMark size={48} ring className="mx-auto mb-3" />
                    <span className="text-[10px] uppercase tracking-widest text-muted block mb-1">
                      Trân Trọng Kính Mời
                    </span>
                    <h4 className="font-serif text-2xl text-ink font-semibold">
                      {state.couple.groom.shortName} & {state.couple.bride.shortName}
                    </h4>
                    <p className="text-xs text-gold font-serif italic mt-1 mb-4">
                      {state.couple.weddingDate.slice(0, 10)}
                    </p>
                    <div className="p-3 bg-cream/60 rounded-xl border border-line text-xs text-muted mb-6 inline-block">
                      <span>Đại tiệc tại Riverside Palace</span>
                    </div>

                    <div className="pt-4 border-t border-line/60">
                      <button
                        onClick={() => {
                          if (onOpenInvitationPreview) {
                            onClose()
                            onOpenInvitationPreview()
                          }
                        }}
                        className="px-5 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mở trải nghiệm 3D toàn màn hình</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: KHÁCH MỜI & RSVP (GUESTS)
              ========================================================================= */}
          {activeTab === 'guests' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs text-muted font-medium uppercase tracking-wider">
                    Tổng lượt xác nhận
                  </span>
                  <span className="font-serif text-3xl text-ink font-bold mt-2 block">
                    {totalRsvps}
                  </span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs text-muted font-medium uppercase tracking-wider">
                    Khách báo tham dự
                  </span>
                  <span className="font-serif text-3xl text-moss font-bold mt-2 block">
                    {totalAttending}
                  </span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-line shadow-xs">
                  <span className="text-xs text-muted font-medium uppercase tracking-wider">
                    Dự kiến số người đi cùng
                  </span>
                  <span className="font-serif text-3xl text-gold font-bold mt-2 block">
                    {totalGuests} người
                  </span>
                </div>
              </div>

              {/* Table Controls */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-line gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm theo tên, SĐT, ghi chú..."
                      value={rsvpSearch}
                      onChange={(e) => setRsvpSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-cream/30 border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <select
                      value={rsvpFilterSide}
                      onChange={(e) => setRsvpFilterSide(e.target.value as any)}
                      className="px-3 py-2 text-xs bg-cream/30 border border-line rounded-xl focus:outline-none"
                    >
                      <option value="all">Tất cả khách</option>
                      <option value="groom">Nhà Trai</option>
                      <option value="bride">Nhà Gái</option>
                      <option value="mutual">Bạn chung</option>
                    </select>

                    <button
                      onClick={exportRsvpsToCsv}
                      className="px-4 py-2 rounded-xl bg-moss text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-moss-dark"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Xuất Excel / CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line text-muted uppercase text-[11px]">
                        <th className="pb-3 font-semibold">Khách mời</th>
                        <th className="pb-3 font-semibold">Số điện thoại</th>
                        <th className="pb-3 font-semibold">Phía khách</th>
                        <th className="pb-3 font-semibold">Số lượng đi cùng</th>
                        <th className="pb-3 font-semibold">Ghi chú</th>
                        <th className="pb-3 font-semibold text-right">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredRsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-cream/30 transition-colors">
                          <td className="py-3.5 font-semibold text-ink font-serif text-sm">
                            {rsvp.fullName}
                          </td>
                          <td className="py-3.5 text-muted">{rsvp.phone}</td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cream border border-line text-ink">
                              {rsvp.side === 'groom' && 'Nhà Trai'}
                              {rsvp.side === 'bride' && 'Nhà Gái'}
                              {rsvp.side === 'mutual' && 'Bạn chung'}
                            </span>
                          </td>
                          <td className="py-3.5 font-semibold text-ink">
                            {rsvp.guestCount || 1} người
                          </td>
                          <td className="py-3.5 text-muted max-w-xs truncate">
                            {rsvp.dietaryNotes || '—'}
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => {
                                if (window.confirm(`Xóa phản hồi của ${rsvp.fullName}?`)) {
                                  deleteRsvp(rsvp.id)
                                }
                              }}
                              className="p-1.5 text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: LỜI CHÚC (WISHES MODERATION)
              ========================================================================= */}
          {activeTab === 'wishes' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-ink">
                    Kiểm Duyệt Sổ Lưu Bút Lời Chúc
                  </h3>
                  <p className="text-xs text-muted">
                    Duyệt các lời chúc từ khách mời trước khi công khai hiển thị trên thiệp cưới
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.wishes.map((wish) => {
                  const isApproved = approvedWishes[wish.id] ?? false
                  return (
                    <div
                      key={wish.id}
                      className="bg-white p-5 rounded-2xl border border-line shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-semibold text-sm text-ink">
                            {wish.senderName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              isApproved
                                ? 'bg-moss/10 text-moss border border-moss/20'
                                : 'bg-amber-50 text-amber-600 border border-amber-200'
                            }`}
                          >
                            {isApproved ? 'Đã duyệt' : 'Chờ duyệt'}
                          </span>
                        </div>
                        <span className="text-[11px] text-gold font-medium block mb-2">
                          Mối quan hệ: {wish.relationship}
                        </span>
                        <p className="text-xs text-muted leading-relaxed italic bg-cream/40 p-3 rounded-xl border border-line/60">
                          “{wish.message}”
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-line/60">
                        <span className="text-[10px] text-muted">{wish.createdAt}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishApproval(wish.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                              isApproved
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-moss text-white hover:bg-moss-dark'
                            }`}
                          >
                            {isApproved ? (
                              <>
                                <Ban className="w-3 h-3" /> Ẩn đi
                              </>
                            ) : (
                              <>
                                <Check className="w-3 h-3" /> Duyệt hiển thị
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => deleteWish(wish.id)}
                            className="p-1.5 text-muted hover:text-red-500 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: ALBUM ẢNH (GALLERY)
              ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Add Photo Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm">
                <h3 className="font-serif text-xl font-semibold text-ink mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-gold" />
                  <span>Thêm Hình Ảnh Vào Bộ Sưu Tập</span>
                </h3>

                <form onSubmit={handleAddPhoto} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Tiêu đề ảnh</label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Khoảnh khắc trao nhẫn..."
                        value={newPhotoTitle}
                        onChange={(e) => setNewPhotoTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Phân loại ảnh</label>
                      <select
                        value={newPhotoCategory}
                        onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      >
                        <option value="ceremony">Nghi Lễ (Ceremony)</option>
                        <option value="outdoor">Ngoại Cảnh (Outdoor)</option>
                        <option value="moments">Khoảnh Khắc Đẹp (Moments)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">Tỉ lệ khung hình</label>
                      <select
                        value={newPhotoAspect}
                        onChange={(e) => setNewPhotoAspect(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                      >
                        <option value="wide">Ngang (Wide 16:9)</option>
                        <option value="tall">Dọc (Tall 3:4)</option>
                        <option value="square">Vuông (Square 1:1)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <ImageUploadField
                      label="Đường dẫn hoặc tải ảnh lên"
                      value={newPhotoUrl}
                      onChange={setNewPhotoUrl}
                      aspectRatioClass="aspect-[4/3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Chú thích ảnh</label>
                    <input
                      type="text"
                      placeholder="Mô tả cảm xúc hoặc thời điểm chụp..."
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-line rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white text-xs font-semibold shadow-sm"
                  >
                    Thêm vào Album
                  </button>
                </form>
              </div>

              {/* Photos List Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {state.gallery.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-2xl overflow-hidden border border-line shadow-xs relative group"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <button
                        onClick={() => deleteGalleryPhoto(photo.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Xóa ảnh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3 text-xs">
                      <span className="font-semibold text-ink block truncate">{photo.title}</span>
                      <span className="text-[10px] text-gold uppercase">{photo.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: NỘI DUNG & DỊCH VỤ (CONTENT)
              ========================================================================= */}
          {activeTab === 'content' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm">
                <h3 className="font-serif text-2xl font-semibold text-ink mb-1">
                  Quản Lý Dịch Vụ Wedding Planner
                </h3>
                <p className="text-xs text-muted mb-6">
                  Danh sách 6 nhóm dịch vụ hiển thị trên Website công khai
                </p>

                <div className="space-y-4">
                  {plannerServices.map((svc) => (
                    <div
                      key={svc.id}
                      className="p-4 rounded-2xl bg-cream/30 border border-line flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{svc.icon}</span>
                        <div>
                          <h4 className="font-serif font-semibold text-sm text-ink">{svc.title}</h4>
                          <p className="text-xs text-muted line-clamp-1">{svc.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-gold bg-white px-3 py-1 rounded-full border border-line flex-shrink-0">
                        {svc.priceRange}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: CÀI ĐẶT (SETTINGS)
              ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-luxury-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-ink">
                    Cấu Hình Nhận Diện Thương Hiệu
                  </h3>
                  <p className="text-xs text-muted">
                    Tên thương hiệu, biểu trưng hoa sen, thông tin liên hệ và sao lưu
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Tên thương hiệu</label>
                    <input
                      type="text"
                      readOnly
                      value={brandInfo.name}
                      className="w-full px-3 py-2 text-sm bg-cream/30 border border-line rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Khẩu hiệu (Slogan)</label>
                    <input
                      type="text"
                      readOnly
                      value={brandInfo.slogan}
                      className="w-full px-3 py-2 text-sm bg-cream/30 border border-line rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Hotline liên hệ</label>
                    <input
                      type="text"
                      readOnly
                      value={brandInfo.hotline}
                      className="w-full px-3 py-2 text-sm bg-cream/30 border border-line rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Showroom đón tiếp</label>
                    <input
                      type="text"
                      readOnly
                      value={brandInfo.address}
                      className="w-full px-3 py-2 text-sm bg-cream/30 border border-line rounded-xl"
                    />
                  </div>
                </div>

                {/* Backup & Restore Controls */}
                <div className="pt-6 border-t border-line space-y-4">
                  <h4 className="font-serif text-base font-semibold text-ink">
                    Sao Lưu & Khôi Phục Hệ Thống
                  </h4>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleExportJson}
                      className="px-5 py-2.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line text-xs font-semibold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4 text-gold" />
                      <span>Tải Tệp Sao Lưu JSON</span>
                    </button>

                    <label className="px-5 py-2.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line text-xs font-semibold flex items-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4 text-gold" />
                      <span>Khôi Phục Từ File JSON</span>
                      <input
                        type="file"
                        accept=".json"
                        ref={jsonInputRef}
                        onChange={handleImportJsonFile}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={handleResetDefaults}
                      className="px-5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Khôi Phục Dữ Liệu Gốc</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Add New Couple Profile */}
      {showAddCoupleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowAddCoupleModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-line">
            <h4 className="font-serif text-xl font-semibold text-ink mb-1">
              Tạo Hồ Sơ Cặp Đôi Mới
            </h4>
            <p className="text-xs text-muted mb-4">
              Nhập tên hai bạn để khởi tạo không gian thiệp cưới riêng biệt
            </p>

            <form onSubmit={handleCreateCouple} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Tên Chú Rể</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Hoàng Nam"
                  value={newCoupleGroom}
                  onChange={(e) => setNewCoupleGroom(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-line rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Tên Cô Dâu</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Minh Anh"
                  value={newCoupleBride}
                  onChange={(e) => setNewCoupleBride(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-line rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Ngày Cưới</label>
                <input
                  type="date"
                  value={newCoupleDate}
                  onChange={(e) => setNewCoupleDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-line rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Địa Điểm Tổ Chức</label>
                <input
                  type="text"
                  placeholder="VD: Trung tâm hội nghị Quốc Gia..."
                  value={newCoupleVenue}
                  onChange={(e) => setNewCoupleVenue(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-line rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCoupleModal(false)}
                  className="px-4 py-2 rounded-full border border-line text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gold text-white text-xs font-semibold shadow-sm"
                >
                  Tạo Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
