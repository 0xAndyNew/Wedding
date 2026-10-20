import React, { useState, useEffect, useMemo } from 'react'
import { Gift, Heart, Sparkles, ArrowLeft } from 'lucide-react'
import {
  HeroSection,
  SaveTheDateSection,
  CoupleSection,
  EventDetailsSection,
  GallerySection,
  RsvpSection,
  GuestbookSection,
  GiftBoxModal,
  InvitationGateway,
} from './components/sections/index.ts'
import { AudioPlayer } from './components/ui/AudioPlayer.tsx'
import { WeddingJourneyScene } from './components/canvas/WeddingJourneyScene.tsx'
import { useWeddingAudio } from './hooks/useWeddingAudio.ts'
import { useWeddingJourney } from './hooks/useWeddingJourney.ts'
import { WeddingDataProvider, useWeddingData } from './store/WeddingContext.tsx'
import { AdminDashboard } from './components/admin/AdminDashboard.tsx'

// Wedding Planner Public Portal Components
import { PortalHeader, PortalNavTab } from './components/portal/PortalHeader.tsx'
import { PortalFooter } from './components/portal/PortalFooter.tsx'
import { ConsultationModal } from './components/portal/ConsultationModal.tsx'
import { HomePage } from './components/portal/HomePage.tsx'
import { AboutPage } from './components/portal/AboutPage.tsx'
import { ProcessPage } from './components/portal/ProcessPage.tsx'
import { ServicesPage } from './components/portal/ServicesPage.tsx'
import { ProjectsPage } from './components/portal/ProjectsPage.tsx'
import { InvitationsPage } from './components/portal/InvitationsPage.tsx'
import { ContactPage } from './components/portal/ContactPage.tsx'
import { PrivacyPage } from './components/portal/PrivacyPage.tsx'

type AppViewMode = 'portal' | 'invitation'

const MainAppContent: React.FC = () => {
  const { state } = useWeddingData()
  const { couple, events, gallery } = state

  // View state
  const [viewMode, setViewMode] = useState<AppViewMode>('portal')
  const [portalTab, setPortalTab] = useState<PortalNavTab>('home')
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [consultationServiceId, setConsultationServiceId] = useState<string | undefined>()

  // 3D Invitation State
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [activeHeroPortrait, setActiveHeroPortrait] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isMuted } = useWeddingAudio()
  const journeyRef = useWeddingJourney(viewMode === 'invitation' && hasEnteredSite && !isAdminOpen)

  const heroPortraits = useMemo(
    () =>
      Array.from(
        new Set([couple.jointImage, ...(couple.heroBanners ?? [])].filter(Boolean)),
      ).slice(0, 4),
    [couple.heroBanners, couple.jointImage],
  )
  const heroImage = heroPortraits[activeHeroPortrait] ?? couple.jointImage

  useEffect(() => {
    if (activeHeroPortrait >= heroPortraits.length) setActiveHeroPortrait(0)
  }, [activeHeroPortrait, heroPortraits.length])

  // Sync state with URL hash and history
  useEffect(() => {
    const handleHashRoute = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '')
      const path = window.location.pathname.toLowerCase()

      if (hash === 'admin' || path === '/admin' || path.endsWith('/admin')) {
        setIsAdminOpen(true)
        return
      }

      if (hash === 'invitation' || hash === 'invitation-3d' || hash === 'thiep-cuoi') {
        setViewMode('invitation')
        return
      }

      const validTabs: PortalNavTab[] = [
        'home',
        'about',
        'process',
        'services',
        'projects',
        'invitations',
        'contact',
        'privacy',
      ]

      if (validTabs.includes(hash as PortalNavTab)) {
        setViewMode('portal')
        setPortalTab(hash as PortalNavTab)
      }
    }

    handleHashRoute()
    window.addEventListener('popstate', handleHashRoute)
    window.addEventListener('hashchange', handleHashRoute)

    // Keyboard shortcut: Ctrl+Shift+A or Alt+A to quickly open Admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') ||
        (e.altKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault()
        setIsAdminOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('popstate', handleHashRoute)
      window.removeEventListener('hashchange', handleHashRoute)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Switch tabs and update hash
  const handleSelectPortalTab = (tab: PortalNavTab) => {
    setPortalTab(tab)
    setViewMode('portal')
    window.location.hash = `#${tab}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenInvitation3D = () => {
    setViewMode('invitation')
    window.location.hash = '#invitation'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReturnToPortal = () => {
    setViewMode('portal')
    window.location.hash = `#${portalTab}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenConsultationModal = (serviceId?: string) => {
    setConsultationServiceId(serviceId)
    setIsConsultationModalOpen(true)
  }

  const handleOpenAdmin = () => {
    setIsAdminOpen(true)
  }

  const handleCloseAdmin = () => {
    setIsAdminOpen(false)
    if (window.location.pathname.endsWith('/admin')) {
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/, '/') || '/'
      window.history.pushState(null, '', cleanPath)
    } else if (window.location.hash === '#admin') {
      window.history.pushState(null, '', `#${portalTab}`)
    }
  }

  // Track scroll progress for subtle golden indicator in invitation
  useEffect(() => {
    if (viewMode !== 'invitation') return

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [viewMode])

  const handleScrollToStory = () => {
    const el =
      document.getElementById('invitation') ||
      document.getElementById('calendar') ||
      document.getElementById('couple')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-ivory font-sans text-ink selection:bg-champagne/40">
      {/* =========================================================================
          VIEW MODE 1: PUBLIC WEDDING PLANNER PORTAL
          ========================================================================= */}
      {viewMode === 'portal' && (
        <div className="flex flex-col min-h-screen">
          {/* Main Navigation Header */}
          <PortalHeader
            currentTab={portalTab}
            onSelectTab={handleSelectPortalTab}
            onOpenInvitation3D={handleOpenInvitation3D}
            onOpenAdmin={handleOpenAdmin}
            onOpenConsultationModal={() => handleOpenConsultationModal()}
          />

          {/* Active Tab Page Content */}
          <main className="flex-1">
            {portalTab === 'home' && (
              <HomePage
                onSelectTab={handleSelectPortalTab}
                onOpenInvitation3D={handleOpenInvitation3D}
                onOpenConsultationModal={handleOpenConsultationModal}
              />
            )}

            {portalTab === 'about' && (
              <AboutPage
                onSelectTab={handleSelectPortalTab}
                onOpenConsultationModal={() => handleOpenConsultationModal()}
              />
            )}

            {portalTab === 'process' && (
              <ProcessPage
                onSelectTab={handleSelectPortalTab}
                onOpenConsultationModal={() => handleOpenConsultationModal()}
              />
            )}

            {portalTab === 'services' && (
              <ServicesPage
                onSelectTab={handleSelectPortalTab}
                onOpenConsultationModal={handleOpenConsultationModal}
                onOpenInvitation3D={handleOpenInvitation3D}
              />
            )}

            {portalTab === 'projects' && (
              <ProjectsPage
                onSelectTab={handleSelectPortalTab}
                onOpenConsultationModal={() => handleOpenConsultationModal()}
              />
            )}

            {portalTab === 'invitations' && (
              <InvitationsPage
                onSelectTab={handleSelectPortalTab}
                onOpenInvitation3D={handleOpenInvitation3D}
                onOpenConsultationModal={handleOpenConsultationModal}
              />
            )}

            {portalTab === 'contact' && <ContactPage onSelectTab={handleSelectPortalTab} />}

            {portalTab === 'privacy' && <PrivacyPage onSelectTab={handleSelectPortalTab} />}
          </main>

          {/* Main Footer */}
          <PortalFooter
            onSelectTab={handleSelectPortalTab}
            onOpenInvitation3D={handleOpenInvitation3D}
            onOpenAdmin={handleOpenAdmin}
          />
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: INTERACTIVE 3D DIGITAL WEDDING INVITATION
          ========================================================================= */}
      {viewMode === 'invitation' && (
        <div className="min-h-screen bg-[#0b1a2a] text-charcoal font-sans selection:bg-gold-light/40 relative">
          {/* Top floating bar to return to Wedding Planner portal */}
          <div className="fixed top-4 left-4 z-50">
            <button
              onClick={handleReturnToPortal}
              className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-ink backdrop-blur-md shadow-luxury text-xs font-semibold flex items-center gap-2 border border-line transition-all hover:scale-105"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>← Về Trang Chủ Wedding Planner</span>
            </button>
          </div>

          {!hasEnteredSite && (
            <InvitationGateway
              couple={couple}
              onEnterSite={() => setHasEnteredSite(true)}
              isMuted={isMuted}
            />
          )}

          {hasEnteredSite && (
            <WeddingJourneyScene
              couple={couple}
              events={events}
              gallery={gallery}
              heroImage={heroImage}
              journeyRef={journeyRef}
              paused={isAdminOpen}
            />
          )}

          <div
            className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-50 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-[#789aba] via-gold-light to-gold transition-all duration-150 ease-out shadow-[0_0_12px_rgba(228,202,136,0.7)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <main className="journey-content relative z-10">
            <HeroSection
              couple={couple}
              activePortrait={activeHeroPortrait}
              onActivePortraitChange={setActiveHeroPortrait}
              onScrollToStory={handleScrollToStory}
            />
            <SaveTheDateSection couple={couple} />
            <CoupleSection couple={couple} />
            <EventDetailsSection events={events} />
            <GallerySection photos={gallery} />
            <RsvpSection />
            <GuestbookSection />
          </main>

          <footer
            data-journey-chapter="finale"
            className="journey-chapter relative z-10 overflow-hidden min-h-[100svh] flex flex-col justify-end px-4 pb-12 sm:pb-16 text-center text-white"
          >
            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              <h3 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight mb-2 [text-shadow:0_4px_24px_rgba(4,18,31,0.85)]">
                {couple.groom.shortName}{' '}
                <span className="font-script text-gold-light text-2xl sm:text-4xl">&</span>{' '}
                {couple.bride.shortName}
              </h3>

              <p className="font-serif italic text-sky-100 text-sm sm:text-base mb-4 [text-shadow:0_2px_12px_rgba(4,18,31,0.85)]">
                “Cảm ơn bạn đã là một phần đặc biệt trong ngày trọng đại của chúng mình!”
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-12 bg-gold/40" />
                <Heart className="w-4 h-4 text-gold-light fill-gold-light" />
                <span className="h-[1px] w-12 bg-gold/40" />
              </div>

              <p className="text-xs text-sky-100/75 font-light">
                20 · 11 · 2026 •{' '}
                {events.find((e) => e.type === 'reception')?.locationName || 'Riverside Palace'} • TP.
                Hồ Chí Minh
              </p>

              <div className="mt-5 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-center gap-3 text-[11px] text-sky-100/60">
                <button
                  onClick={handleReturnToPortal}
                  className="text-gold-light hover:text-white font-serif underline underline-offset-4 cursor-pointer"
                >
                  ← Về Trang Chủ Wedding Planner
                </button>
                <span>•</span>
                <a
                  href="#admin"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsAdminOpen(true)
                  }}
                  className="text-gold-light hover:text-white font-serif underline underline-offset-4 cursor-pointer"
                >
                  <span>Quản Trị (/admin)</span>
                </a>
              </div>
            </div>
          </footer>

          {hasEnteredSite && (
            <>
              <div className="fixed bottom-6 right-6 z-40 [perspective:700px]">
                <button
                  type="button"
                  onClick={() => setIsGiftModalOpen(true)}
                  aria-label="Mở hộp mừng cưới"
                  className="journey-gift-button min-h-[50px] px-5 py-3 text-charcoal font-sans text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2.5 cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-charcoal" />
                  <span>Mừng cưới</span>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <AudioPlayer position="bottom-left" />
            </>
          )}

          {/* Gift Box Modal */}
          <GiftBoxModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
        </div>
      )}

      {/* =========================================================================
          GLOBAL MODALS
          ========================================================================= */}
      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialServiceId={consultationServiceId}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        onOpenInvitationPreview={() => {
          setViewMode('invitation')
          setHasEnteredSite(true)
          window.location.hash = '#invitation'
        }}
      />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <WeddingDataProvider>
      <MainAppContent />
    </WeddingDataProvider>
  )
}

export default App
