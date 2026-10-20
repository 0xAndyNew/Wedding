import React, { useState } from 'react'
import { MapPin, Calendar, Eye, X } from 'lucide-react'
import { plannerProjects, PlannerProject } from '../../data/plannerData.ts'
import { PortalNavTab } from './PortalHeader.tsx'

interface ProjectsPageProps {
  onSelectTab: (tab: PortalNavTab) => void
  onOpenConsultationModal: () => void
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectTab,
  onOpenConsultationModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all')
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string } | null>(null)

  const filteredProjects =
    activeFilter === 'all'
      ? plannerProjects
      : plannerProjects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())))

  return (
    <div className="min-h-screen bg-ivory text-ink py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Dự án cưới & Album thực tế
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal mt-3 mb-4">
            Mỗi đám cưới là một câu chuyện tình yêu
          </h1>
          <div className="w-16 h-0.5 bg-champagne mx-auto my-4" />
          <p className="text-base text-muted leading-relaxed">
            Khám phá những khoảnh khắc hạnh phúc và các concept trang trí độc bản được Xuân Hiếu Hương Thảo chăm chút cho các cặp đôi.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {[
            { id: 'all', label: 'Tất cả dự án' },
            { id: 'Luxury Champagne', label: 'Thanh lịch hoàng gia' },
            { id: 'Outdoor', label: 'Vườn hoa ngoài trời' },
            { id: 'Lễ gia tiên', label: 'Nét Việt truyền thống' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === btn.id
                  ? 'bg-gold text-white shadow-sm'
                  : 'bg-white text-muted hover:text-ink border border-line'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Showcase */}
        <div className="space-y-24 mb-24">
          {filteredProjects.map((project: PlannerProject) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-luxury-sm"
            >
              {/* Project Title Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-line gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="font-serif italic text-gold text-xs font-semibold">
                      Dự án {project.number}
                    </span>
                    <span className="text-line">•</span>
                    <span className="text-xs text-muted font-sans font-medium">
                      {project.concept}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                    {project.title} — {project.clientName}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {project.weddingDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Narrative description */}
              <p className="text-sm text-muted leading-relaxed max-w-4xl mb-8">
                {project.description}
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.highlights.map((h, hIdx) => (
                  <span
                    key={hIdx}
                    className="px-3 py-1 rounded-full bg-cream text-ink text-xs border border-line font-medium"
                  >
                    ✦ {h}
                  </span>
                ))}
              </div>

              {/* Photo Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.gallery.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => setLightboxImage(photo)}
                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-line"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                      <div className="text-white">
                        <Eye className="w-6 h-6 mx-auto mb-1 text-champagne-light" />
                        <span className="text-xs font-serif italic line-clamp-2">
                          {photo.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setLightboxImage(null)}
            />
            <div className="relative z-10 max-w-4xl max-h-[90vh] flex flex-col items-center">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
              <p className="mt-3 text-white text-sm font-serif italic text-center">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            onClick={onOpenConsultationModal}
            className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-white font-semibold text-sm shadow-luxury transition-all"
          >
            Tạo Nên Câu Chuyện Cưới Riêng Của Bạn
          </button>
          <button
            onClick={() => onSelectTab('invitations')}
            className="px-6 py-3.5 rounded-full bg-cream hover:bg-champagne-light text-ink border border-line text-xs font-semibold transition-colors"
          >
            Xem bộ sưu tập thiệp cưới 3D →
          </button>
        </div>
      </div>
    </div>
  )
}
