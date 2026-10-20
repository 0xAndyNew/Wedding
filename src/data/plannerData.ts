export interface PlannerService {
  id: string
  title: string
  subtitle: string
  icon: string
  description: string
  deliverables: string[]
  priceRange: string
  image: string
  tag: string
}

export interface PlannerProject {
  id: string
  number: string
  title: string
  concept: string
  tags: string[]
  description: string
  coverImage: string
  gallery: {
    url: string
    caption: string
    aspect?: 'tall' | 'wide' | 'square'
  }[]
  clientName: string
  weddingDate: string
  location: string
  highlights: string[]
}

export interface InvitationTemplate {
  id: string
  name: string
  category: '3d-luxury' | 'traditional' | 'modern'
  tagline: string
  description: string
  themeColor: string
  previewImage: string
  features: string[]
  isHot?: boolean
}

export interface ProcessStep {
  step: string
  title: string
  subtitle: string
  description: string
  activities: string[]
  duration: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  signature?: string
}

export const plannerServices: PlannerService[] = [
  {
    id: 'to-chuc-tiec-cuoi',
    title: 'Tổ chức tiệc cưới trọn gói',
    subtitle: 'Đồng hành từ ý tưởng đầu tiên đến khi kết thúc ngày vui',
    icon: '✿',
    description: 'Lên ý tưởng sáng tạo, lập kế hoạch chi tiết, quản lý ngân sách thông minh, tuyển chọn nhà cung cấp uy tín và giám sát toàn diện ngày trọng đại.',
    deliverables: [
      'Xây dựng moodboard ý tưởng & định hình phong cách đám cưới độc bản',
      'Quản lý và tối ưu hóa ngân sách theo từng hạng mục',
      'Lựa chọn và đàm phán hợp đồng với các đối tác (Địa điểm, hoa tươi, âm thanh, ánh sáng)',
      'Lên kịch bản chi tiết từng phút cho ngày cưới',
      'Đội ngũ planner túc trực đồng hành suốt 6–12 tháng chuẩn bị',
    ],
    priceRange: 'Từ 35.000.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    tag: 'Dịch vụ được chọn nhiều nhất',
  },
  {
    id: 'trang-tri-le-cuoi',
    title: 'Trang trí lễ cưới & không gian',
    subtitle: 'Nghệ thuật hoa tươi và thiết kế bối cảnh điện ảnh',
    icon: '❀',
    description: 'Không gian đón khách, sân khấu lễ đường, bàn tiệc gallery, lễ gia tiên truyền thống và các chi tiết trang trí thủ công tinh xảo theo chủ đề.',
    deliverables: [
      'Thiết kế 3D không gian lễ đường và sảnh đón khách chân thực',
      'Trang trí bàn đón khách (Gallery table), cổng hoa, backdrop chụp hình',
      'Trang trí bàn tiệc VIP với hoa tươi nhập khẩu cao cấp, nến thơm, phụ kiện vàng champagne',
      'Trang trí bàn thờ gia tiên trang nghiêm, chuẩn phong tục văn hóa Việt Nam',
      'Hệ thống ánh sáng nghệ thuật tôn vinh khoảnh khắc thiêng liêng',
    ],
    priceRange: 'Từ 45.000.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    tag: 'Thiết kế độc bản',
  },
  {
    id: 'anh-cuoi-va-phim-cuoi',
    title: 'Ảnh cưới và phim cưới nghệ thuật',
    subtitle: 'Lưu giữ cảm xúc tự nhiên, vượt thời gian',
    icon: '♡',
    description: 'Ghi lại những khoảnh khắc đáng nhớ nhất bằng phong cách hình ảnh cảm xúc, màu sắc chân thực và đồng nhất tuyệt đối với câu chuyện ngày cưới.',
    deliverables: [
      'Bộ ảnh Pre-wedding ngoại cảnh hoặc studio phong cách Luxury Editorial',
      'Phim phóng sự cưới 4K chuẩn điện ảnh (Highlight 3–5 phút & Full Documentary)',
      'Đội ngũ nhiếp ảnh gia và quay phim chuyên nghiệp, nhiệt tình, giàu kinh nghiệm',
      'Toàn bộ file gốc chất lượng cao và album photobook in ấn cao cấp',
      'Thiết bị flycam quay toàn cảnh không gian tiệc cưới ngoài trời',
    ],
    priceRange: 'Từ 25.000.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    tag: 'Điện ảnh cảm xúc',
  },
  {
    id: 'thiep-cuoi-truc-tuyen',
    title: 'Thiệp cưới trực tuyến 3D',
    subtitle: 'Trải nghiệm mở thiệp tương tác sang trọng, hiện đại',
    icon: '✉',
    description: 'Nền tảng thiệp cưới điện tử cao cấp với bao thư 3D mở sáp niêm phong, nhạc nền lãng mạn, album ảnh, mã QR, bản đồ GPS và xác nhận tham dự (RSVP).',
    deliverables: [
      'Bao thư 3D tương tác mở niêm phong sáp (Wax Seal) chân thực như ngoài đời',
      'Cá nhân hóa toàn bộ thông tin cô dâu, chú rể, song thân, ngày giờ, địa điểm',
      'Tích hợp Google Maps chỉ đường tiện lợi cho khách mời',
      'Hệ thống quản lý khách xác nhận tham dự (RSVP) và xuất file Excel',
      'Sổ lưu bút online nhận lời chúc phúc kèm hiệu ứng pháo hoa hoa giấy',
      'Mã QR và đường link riêng biệt để gửi thiệp qua Zalo, Facebook, SMS',
    ],
    priceRange: 'Từ 1.200.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
    tag: 'Công nghệ 3D độc quyền',
  },
  {
    id: 'dieu-phoi-ngay-cuoi',
    title: 'Điều phối ngày cưới (Wedding Coordinator)',
    subtitle: 'Đảm bảo ngày vui diễn ra suôn sẻ từng giây phút',
    icon: '⌖',
    description: 'Lập lịch trình chi tiết, phân công nhân sự, phối hợp nhịp nhàng các đối tác cung cấp dịch vụ và hỗ trợ gia đình hai bên xử lý mọi tình huống.',
    deliverables: [
      'Rà soát kịch bản và diễn tập nghi thức cùng cô dâu chú rể trước ngày cưới',
      'Đội ngũ điều phối viên 4–6 người túc trực từ 5h sáng đến khi tiệc tan',
      'Đón tiếp khách mời VIP, hướng dẫn vị trí bàn tiệc chu đáo',
      'Điều phối âm thanh, ánh sáng, ban nhạc, MC chuẩn xác theo từng thời điểm',
      'Chăm sóc trang phục, dặm phấn, tiếp nước riêng cho cô dâu chú rể',
    ],
    priceRange: 'Từ 15.000.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    tag: 'An tâm tuyệt đối',
  },
  {
    id: 'thiet-ke-theo-yeu-cau',
    title: 'Thiết kế Concept cưới độc bản',
    subtitle: 'Kể câu chuyện tình yêu của riêng hai bạn',
    icon: '✧',
    description: 'Tùy chỉnh phong cách, bảng màu, nghi thức và trải nghiệm khách mời hoàn toàn theo kỷ niệm, dấu ấn tình yêu và ước mơ của cô dâu chú rể.',
    deliverables: [
      'Phỏng vấn sâu hành trình yêu nhau để tìm ra Concept Signature độc nhất',
      'Thiết kế Logo/Monogram cưới mang tên hai bạn xuất hiện trên mọi ấn phẩm',
      'May đo riêng các cấu trúc trang trí nghệ thuật và sân khấu biểu tượng',
      'Sáng tạo quà cảm ơn (Wedding Favors) mang dấu ấn cá nhân cho từng vị khách',
      'Thiết kế trải nghiệm tương tác bất ngờ dành tặng đối phương trong lễ cưới',
    ],
    priceRange: 'Tùy chỉnh theo yêu cầu',
    image: 'https://images.unsplash.com/photo-1519225424976-135832a82967?q=80&w=1200&auto=format&fit=crop',
    tag: 'Exclusive Bespoke',
  },
]

export const plannerProjects: PlannerProject[] = [
  {
    id: 'thanh-lich-vuot-thoi-gian',
    number: '01',
    title: 'Thanh lịch vượt thời gian',
    concept: 'Kem ngà · Hoa trắng · Ánh nến lung linh',
    tags: ['Luxury Champagne', 'Hoa tươi nhập khẩu', 'Không gian trong nhà'],
    description: 'Được tổ chức tại không gian Grand Ballroom khách sạn 5 sao, đám cưới của Minh Anh & Hoàng Nam toát lên vẻ đẹp vương giả cổ điển với hàng ngàn ngọn nến lung linh kết hợp cùng hoa lan hồ điệp và hoa hồng trắng tinh khôi.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
        caption: 'Không gian lễ đường bồng bềnh như mây với hàng ngàn cành hoa trắng',
        aspect: 'wide',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
        caption: 'Bàn tiệc VIP với chân nến mạ vàng champagne và menu giấy mỹ thuật ép kim',
        aspect: 'tall',
      },
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
        caption: 'Khoảnh khắc cô dâu chú rể trao lời thề nguyện trăm năm',
        aspect: 'square',
      },
      {
        url: 'https://images.unsplash.com/photo-1519225424976-135832a82967?q=80&w=1000&auto=format&fit=crop',
        caption: 'Khu vực đón khách sang trọng với backdrop hoa sen cách điệu tinh xảo',
        aspect: 'wide',
      },
    ],
    clientName: 'Minh Anh & Hoàng Nam',
    weddingDate: '26/04/2026',
    location: 'JW Marriott Hotel Hanoi',
    highlights: ['350 khách mời VIP', '10.000 cành hoa tươi cao cấp', 'Dàn nhạc giao hưởng thính phòng'],
  },
  {
    id: 'vuon-hoa-lang-man',
    number: '02',
    title: 'Vườn hoa lãng mạn ngoài trời',
    concept: 'Hoa tươi · Gió trời · Hoàng hôn dịu êm',
    tags: ['Outdoor Wedding', 'Vườn châu Âu', 'Hoàng hôn'],
    description: 'Được dựng giữa khu vườn phong cách Pháp ngát hương hoa, tiệc cưới của Thu Hà & Đức Minh đón trọn vẹn ánh hoàng hôn ấm áp. Mỗi góc đón khách đều tràn ngập sắc hoa tươi pastel ngọt ngào và ánh đèn đom đóm lung linh.',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
        caption: 'Cổng hoa cưới ngoài trời hướng ra hồ nước thơ mộng',
        aspect: 'wide',
      },
      {
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
        caption: 'Khoảnh khắc trao nhẫn dưới ánh hoàng hôn ngập tràn cảm xúc',
        aspect: 'tall',
      },
      {
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop',
        caption: 'Tiệc tối thân mật dưới bầu trời ngàn sao và ánh đèn lung linh',
        aspect: 'square',
      },
    ],
    clientName: 'Thu Hà & Đức Minh',
    weddingDate: '15/05/2026',
    location: 'Riverside Garden Estate, Hà Nội',
    highlights: ['200 khách mời thân mật', 'Tiệc cocktail hoàng hôn', 'Lửa trại ấm cúng sau tiệc'],
  },
  {
    id: 'net-viet-trong-ngay-cuoi',
    number: '03',
    title: 'Nét Việt trong ngày cưới',
    concept: 'Lễ gia tiên · Hoa sen · Họa tiết truyền thống',
    tags: ['Lễ gia tiên', 'Bản sắc Việt', 'Hoa sen'],
    description: 'Kết hợp hài hòa giữa nghi thức gia tiên truyền thống và tư duy mỹ thuật hiện đại. Không gian tràn ngập hương hoa sen, vải lụa tơ tằm và các họa tiết chạm khắc cung đình tinh xảo tôn vinh cội nguồn đạo hiếu gia đình.',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000&auto=format&fit=crop',
        caption: 'Bàn thờ gia tiên trang nghiêm với hoa sen trắng và lư hương đồng cổ',
        aspect: 'wide',
      },
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        caption: 'Mâm quả rồng phượng thủ công chạm khắc tinh vi',
        aspect: 'tall',
      },
      {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
        caption: 'Cô dâu chú rể trong tà áo dài truyền thống thêu chỉ vàng tinh xảo',
        aspect: 'square',
      },
    ],
    clientName: 'Phương Linh & Quốc Bảo',
    weddingDate: '08/06/2026',
    location: 'Tư gia Hoàng Thành, Hà Nội',
    highlights: ['Chuẩn nghi lễ gia đình truyền thống', 'Hoa sen Bách Diệp nhập khẩu', 'Trà đạo tiếp khách trang trọng'],
  },
]

export const invitationTemplates: InvitationTemplate[] = [
  {
    id: 'tpl-champagne-3d',
    name: 'Champagne Royal 3D',
    category: '3d-luxury',
    tagline: 'Đỉnh cao tương tác hoàng gia',
    description: 'Bao thư 3D mở phong ấn sáp niêm phong hoa sen (Wax Seal), cánh hoa rơi lãng mạn, nhạc nền du dương và giao diện chuẩn Luxury Champagne.',
    themeColor: '#D5B77A',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    features: ['Bao thư 3D WebGL chân thực', 'Mở sáp niêm phong hoa sen', 'Nhạc nền bật/tắt tự động', 'RSVP & Sổ lưu bút', 'Bản đồ Google Maps'],
    isHot: true,
  },
  {
    id: 'tpl-sen-vang',
    name: 'Sen Vàng Truyền Thống',
    category: 'traditional',
    tagline: 'Đậm đà phong vị văn hóa Việt',
    description: 'Họa tiết hoa sen dát vàng, khung viền truyền thống thanh cao, phù hợp hoàn hảo cho các cặp đôi yêu thích nét đẹp cổ điển gia tiên.',
    themeColor: '#B58A45',
    previewImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    features: ['Họa tiết hoa sen cung đình', 'Nhạc không lời truyền thống', 'Thư mời song thân 2 bên', 'Mã VietQR mừng cưới', 'Lời chúc chúc phúc'],
    isHot: false,
  },
  {
    id: 'tpl-garden-breeze',
    name: 'Vườn Hoa Thơ Mộng',
    category: 'modern',
    tagline: 'Hiện đại, nhẹ nhàng & lãng mạn',
    description: 'Phong cách tối giản châu Âu với hoa lá mềm mại, màu sắc tươi sáng, cực kỳ phù hợp với các tiệc cưới ngoài trời và bãi biển.',
    themeColor: '#6B7964',
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
    features: ['Thiết kế phẳng tinh tế', 'Album ảnh dạng trượt mượt mà', 'Đếm ngược ngày cưới', 'Xác nhận tham dự nhanh', 'Chia sẻ link Zalo/Facebook'],
    isHot: false,
  },
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Khảo sát & Trao đổi ý tưởng',
    subtitle: 'Lắng nghe câu chuyện tình yêu của hai bạn',
    description: 'Buổi gặp gỡ thân mật tại showroom để cùng chia sẻ về sở thích, câu chuyện yêu nhau, phong cách mong muốn và dự trù ngân sách.',
    activities: [
      'Gặp gỡ trực tiếp hoặc qua video call riêng tư',
      'Xác định phong cách chủ đạo (Concept & Moodboard)',
      'Lập bảng dự toán ngân sách chi tiết từng hạng mục',
    ],
    duration: '1 – 2 tuần',
  },
  {
    step: '02',
    title: 'Lập kế hoạch & Thiết kế chi tiết',
    subtitle: 'Biến giấc mơ thành bản vẽ hiện thực',
    description: 'Đội ngũ thiết kế lên bản vẽ 3D chi tiết từng không gian, từ cổng hoa, sảnh đón khách đến sân khấu tiệc cưới và các ấn phẩm thiệp mời.',
    activities: [
      'Khảo sát thực địa địa điểm tổ chức tiệc',
      'Dựng phối cảnh 3D không gian lễ đường và bàn tiệc',
      'Tuyển chọn các nhà cung cấp uy tín phù hợp nhất',
      'Thiết kế thiệp cưới điện tử và bộ nhận diện ngày cưới',
    ],
    duration: '2 – 4 tuần',
  },
  {
    step: '03',
    title: 'Trải nghiệm thử & Tinh chỉnh',
    subtitle: 'Chăm chút tỉ mỉ từng chi tiết nhỏ nhất',
    description: 'Cặp đôi được xem trước mẫu cắm hoa mẫu, nếm thử thực đơn, nghe thử âm thanh, kiểm tra thiệp cưới 3D và khớp kịch bản chi tiết.',
    activities: [
      'Buổi cắm hoa mẫu thử (Mockup floral session)',
      'Thử trang phục cưới, kiểm tra phong cách trang điểm',
      'Duyệt toàn bộ nội dung thiệp mời và danh sách khách',
      'Diễn tập kịch bản lễ cưới cùng MC và gia đình',
    ],
    duration: '1 – 2 tháng trước cưới',
  },
  {
    step: '04',
    title: 'Điều phối & Vận hành ngày cưới',
    subtitle: 'Tận hưởng ngày trọng đại một cách trọn vẹn',
    description: 'Toàn bộ đội ngũ chuyên nghiệp có mặt từ sáng sớm, quản lý từng giây phút để cô dâu chú rể chỉ việc rạng rỡ và hạnh phúc.',
    activities: [
      'Giám sát thi công dàn dựng hoa tươi và thiết bị kỹ thuật',
      'Đón tiếp khách mời chu đáo và hướng dẫn chỗ ngồi',
      'Điều phối toàn bộ timeline nghi thức trên sân khấu',
      'Hỗ trợ cô dâu chú rể xử lý phát sinh tức thời',
    ],
    duration: 'Suốt ngày diễn ra lễ cưới',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Xuân Hiếu',
    role: 'Founder & Giám Đốc Sáng Tạo',
    bio: 'Hơn 8 năm kinh nghiệm trong ngành cưới cao cấp tại Việt Nam. Người đặt nền móng cho triết lý "Đậm chất Việt" trong từng đám cưới hiện đại.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Hương Thảo',
    role: 'Co-Founder & Giám Đốc Mỹ Thuật',
    bio: 'Chuyên gia thiết kế mỹ thuật hoa tươi và không gian cưới. Thổi hồn nét tinh tế, trang nhã và lãng mạn vào mỗi lễ đường.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Trần Đăng Khoa',
    role: 'Trưởng Ban Điều Phối Ngày Cưới',
    bio: 'Kinh nghiệm điều phối hơn 300 đám cưới quy mô từ 200 đến 1.500 khách mời. Luôn bình tĩnh, chu đáo và xử lý linh hoạt mọi tình huống.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Hoàng Mai Linh',
    role: 'Phụ Trách Thiệp Cưới Điện Tử',
    bio: 'Chuyên viên thiết kế trải nghiệm người dùng, đảm bảo từng tấm thiệp 3D mở ra là một tác phẩm nghệ thuật số đầy cảm xúc.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
]

export const brandInfo = {
  name: 'Xuân Hiếu Hương Thảo',
  subName: 'Wedding Planner · Thiệp Cưới Trực Tuyến',
  slogan: 'Tinh tế trong từng khoảnh khắc · Đậm chất Việt',
  tagline: 'Hạnh phúc bắt đầu từ những điều được chăm chút.',
  hotline: '0988 123 456',
  hotlineSecondary: '0912 888 999',
  email: 'contact@xuanhieuhuongthao.vn',
  address: 'Biệt thự 18, Khu Đô Thị Ngoại Giao Đoàn, Tây Hồ, Hà Nội',
  workingHours: '08:30 – 20:30 (Thứ Hai – Chủ Nhật)',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
  },
}
