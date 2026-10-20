import React, { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Calendar, ShieldCheck, ChevronRight } from 'lucide-react'
import { BrandLogo } from '../common/BrandLogo.tsx'

export type PortalNavTab =
  | 'home'
  | 'about'
  | 'process'
  | 'services'
  | 'projects'
  | 'invitations'
  | 'contact'
  | 'privacy'

interface PortalHeaderProps {
  currentTab: PortalNavTab
  onSelectTab: (tab: PortalNavTab) => void
  onOpenInvitation3D: () => void
  onOpenAdmin: () => void
  onOpenConsultationModal: () => void
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenInvitation3D,
  onOpenAdmin,
  onOpenConsultationModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks: { id: PortalNavTab; label: string }[] = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'process', label: 'Quy Trình' },
    { id: 'services', label: 'Dịch Vụ' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'invitations', label: 'Mẫu Thiệp' },
    { id: 'contact', label: 'Liên Hệ' },
  ]

  const handleNavClick = (tab: PortalNavTab) => {
    onSelectTab(tab)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-luxury-sm border-b border-line py-2.5'
            : 'bg-[#FFFDF8]/80 backdrop-blur-sm border-b border-line/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <BrandLogo
              variant="horizontal"
              size="md"
              onClick={() => handleNavClick('home')}
            />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-sans font-medium text-ink/80">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors duration-200 hover:text-gold ${
                    currentTab === link.id
                      ? 'text-gold font-semibold'
                      : 'text-ink/85'
                  }`}
                >
                  {link.label}
                  {currentTab === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full transition-all" />
                  )}
                </button>
              ))}
            </nav>

            {/* Quick Actions (Desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Nút Xem thiệp mẫu 3D */}
              <button
                onClick={onOpenInvitation3D}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-full bg-champagne-light/70 text-ink border border-champagne hover:bg-champagne hover:text-white transition-all duration-200 shadow-sm"
                title="Trải nghiệm mở thiệp cưới 3D tương tác phong bì sáp"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="font-serif italic font-medium">Thiệp Cưới 3D</span>
              </button>

              {/* Nút Đặt lịch tư vấn */}
              <button
                onClick={onOpenConsultationModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-gold text-white hover:bg-gold-dark transition-all duration-200 shadow-sm hover:shadow-luxury-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Đặt Lịch Tư Vấn</span>
              </button>

              {/* Nút Admin */}
              <button
                onClick={onOpenAdmin}
                className="p-2 text-muted hover:text-ink hover:bg-cream rounded-full transition-colors"
                title="Bảng điều khiển quản trị"
              >
                <ShieldCheck className="w-4 h-4 text-muted hover:text-gold" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenInvitation3D}
                className="px-2.5 py-1.5 text-xs rounded-full bg-champagne/20 text-gold border border-champagne/50 font-serif italic"
              >
                Thiệp 3D
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-ink hover:bg-cream transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed right-0 top-0 bottom-0 w-5/6 max-w-sm bg-ivory shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-line">
                <BrandLogo variant="horizontal" size="sm" onClick={() => handleNavClick('home')} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-cream text-muted hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left font-sans text-base transition-colors ${
                      currentTab === link.id
                        ? 'bg-cream text-gold font-semibold'
                        : 'text-ink/80 hover:bg-cream/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${currentTab === link.id ? 'text-gold' : 'text-line'}`} />
                  </button>
                ))}
              </nav>
            </div>

            {/* Drawer footer actions */}
            <div className="pt-6 border-t border-line flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenInvitation3D()
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-champagne-light/70 text-ink border border-champagne font-medium text-sm"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Trải Nghiệm Thiệp Cưới 3D</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenConsultationModal()
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-white font-semibold text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt Lịch Tư Vấn Ngay</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenAdmin()
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs text-muted hover:text-gold"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Khu vực Quản trị (Admin Portal)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
