import { useParams } from 'react-router-dom';
import blog_data from '../../../data/BlogData';

const BlogDetailsArea = () => {
   const { id } = useParams();
   const blogId = id ? parseInt(id) : 1;

   // Get blog data from BlogData
   const getBlogData = (id: number) => {
      return blog_data.find(blog => blog.id === id && blog.page === "home_1");
   };

   const currentBlogData = getBlogData(blogId);

   // Blog content data
   const blogContent = {
      1: {
         title: "Korea–India Trade Relations Reach New Heights in 2026",
         author: "Trade Analyst",
         date: "15 January 2026",
         subtitle: "A Milestone in Bilateral Economic Cooperation",
         content: [
            "The year 2026 has marked a remarkable chapter in the growing partnership between Korea and India, as bilateral trade surpassed the $25 billion mark — a significant milestone that underscores the deepening economic ties between the two dynamic Asian economies.",
            "This achievement reflects the mutual commitment of both nations to fostering stronger trade relations, technological collaboration, and sustainable growth. From automobiles and electronics to information technology, renewable energy, and cultural exchange, the Korea–India relationship continues to evolve beyond traditional trade boundaries."
         ],
         sections: [
            {
               title: "A Strategic Economic Partnership",
               content: [
                  "Korea and India share a long-standing partnership rooted in shared values of innovation, entrepreneurship, and global competitiveness. The recent surge in bilateral trade is driven by collaborative initiatives in sectors such as:",
                  "These partnerships not only enhance economic growth but also contribute to regional stability and sustainable development."
               ],
               list: [
                  "Manufacturing and Automotive – Korea's advanced manufacturing capabilities have complemented India's expanding industrial base, creating new opportunities for supply chain integration and technology transfer.",
                  "Information Technology and Startups – Korean innovation hubs and Indian tech talent have led to numerous cross-border partnerships and startup exchanges.",
                  "Energy and Sustainability – Both nations are investing heavily in clean energy collaborations, including solar, hydrogen, and electric mobility projects."
               ]
            },
            {
               title: "Government Initiatives Driving Growth",
               content: [
                  "The milestone trade volume is supported by strategic policy frameworks and government-to-government cooperation. Programs such as the Korea–India Comprehensive Economic Partnership Agreement (CEPA) have simplified trade barriers and encouraged investment flow.",
                  "Additionally, business missions, trade expos, and innovation forums held in Seoul, New Delhi, and other major cities have paved the way for stronger B2B and G2B networks."
               ]
            },
            {
               title: "The Road Ahead: Collaboration Beyond Commerce",
               content: [
                  "Beyond economics, this partnership represents a bridge of cultural understanding and shared innovation. Initiatives in education, tourism, and the creative industries — such as art collaborations and student exchange programs — are enriching both societies.",
                  "As Korea and India continue to expand their strategic cooperation, 2026 will be remembered not just as a year of trade achievement but as a turning point toward a future built on trust, innovation, and mutual growth."
               ]
            }
         ],
         quote: {
            text: "The milestone trade volume is supported by strategic policy frameworks and government-to-government cooperation",
            author: "Korean Trade Ministry"
         }
      },
      2: {
         title: "Korean Startups Eye Indian Market Expansion",
         author: "Tech Reporter",
         date: "28 January 2026",
         subtitle: "A New Wave of Cross-Border Innovation",
         content: [
            "In a bold move signaling deepening collaboration between two of Asia's fastest-growing economies, major Korean tech companies have announced plans for significant investments in the Indian startup ecosystem. The focus areas — fintech and e-commerce — highlight sectors where India's digital transformation and Korea's technological expertise can create immense value together.",
            "With India emerging as one of the world's most dynamic startup hubs, Korean investors see an unprecedented opportunity to engage with a market that is not only vast in scale but also diverse in innovation and consumer behavior."
         ],
         sections: [
            {
               title: "Why India Is the Next Big Destination for Korean Startups",
               content: [
                  "India's thriving digital economy offers an ecosystem uniquely suited for Korean expansion:",
                  "This combination of scale, innovation, and supportive policy makes India a natural partner for Korea's next phase of startup globalization."
               ],
               list: [
                  "A rapidly growing middle class and increasing smartphone penetration are fueling e-commerce growth at record speed.",
                  "Government initiatives like 'Digital India' and 'Startup India' have created a fertile environment for global investment and innovation.",
                  "Fintech adoption is accelerating, with UPI (Unified Payments Interface) revolutionizing how millions transact daily — an area where Korean startups see clear synergies."
               ]
            },
            {
               title: "Strategic Focus: Fintech and E-Commerce",
               content: [
                  "Korean startups are known for their cutting-edge technology, design thinking, and agility. By aligning with Indian entrepreneurs and local investors, they aim to:",
                  "These collaborations are expected to generate thousands of jobs, accelerate technology transfer, and create new business models for both markets."
               ],
               list: [
                  "Leverage digital payment infrastructure to introduce new financial products tailored to India's diverse customer base.",
                  "Expand e-commerce logistics and user-experience technologies, integrating Korean precision and Indian market insight.",
                  "Foster co-innovation hubs that bring together Korean R&D and Indian software excellence."
               ]
            },
            {
               title: "Government and Institutional Support",
               content: [
                  "Bilateral initiatives such as the Korea-India Startup Alliance and innovation MoUs between business incubators are already laying the groundwork for structured collaboration. Korean accelerators and venture funds are also partnering with Indian institutions like i-Hub, IITs, and state innovation missions to support early-stage ventures and shared R&D programs.",
                  "This government-backed facilitation ensures a stable framework for sustainable growth and trust-based investment."
               ]
            },
            {
               title: "Looking Ahead: Building a Trans-Asian Innovation Bridge",
               content: [
                  "The growing synergy between Korean technological advancement and India's entrepreneurial energy is setting the stage for a transformative decade in Asia's innovation landscape. Beyond capital infusion, this partnership is about mutual learning, co-creation, and shared progress.",
                  "As Korean startups deepen their roots in India, the two nations stand poised to lead the next wave of digital innovation — one that combines creativity, inclusivity, and cross-cultural excellence."
               ]
            }
         ],
         quote: {
            text: "Korean startups are known for their cutting-edge technology, design thinking, and agility",
            author: "Korean Innovation Hub"
         }
      },
      3: {
         title: "Cultural Exchange Programs Show Promising Results",
         author: "Cultural Reporter",
         date: "10 February 2026",
         subtitle: "Korea–India Collaboration Enters a New Era of Cultural Synergy",
         content: [
            "2026 has been a defining year for Korea–India cultural exchange initiatives, as both nations report record participation and meaningful outcomes across education, art, and creative collaborations. These programs, designed to strengthen mutual understanding and cultural appreciation, are now becoming an integral part of the broader bilateral relationship between the two countries.",
            "Through shared experiences in education, art, music, and film, both Korea and India are discovering new avenues to deepen people-to-people connections while enhancing their soft power influence in Asia and beyond."
         ],
         sections: [
            {
               title: "Art, Education, and Beyond",
               content: [
                  "Several cultural exchange programs have shown remarkable impact over the past year:",
                  "These activities underscore how art and education can serve as bridges between societies — nurturing empathy, creativity, and collaboration."
               ],
               list: [
                  "🎨 Art and Performance Collaborations: The India–Korea Artist Camp and joint exhibitions organized by cultural groups such as the Namilsand Culture & Education Group have brought together emerging and established artists from both countries.",
                  "🎭 Academic and Educational Partnerships: Student exchange programs between Sogang University and Indian institutions like IIT Roorkee have fostered collaborative research and intercultural learning.",
                  "📚 Language and Literature: The Korean translation of India's bestseller Super 30 has become a cultural milestone, inspiring further literary exchange initiatives."
               ]
            },
            {
               title: "Government and Institutional Support",
               content: [
                  "Much of this progress has been enabled by the strong commitment of organizations such as KOFICE (Korea Foundation for International Cultural Exchange) and Indian counterparts in the education and cultural sectors.",
                  "Through co-funded projects, youth programs, and bilateral cultural pacts, both governments have prioritized sustainable, inclusive cultural engagement as part of their long-term diplomatic agenda.",
                  "Such institutional backing ensures that these initiatives extend beyond symbolic gestures — translating into measurable social, educational, and economic impact."
               ]
            },
            {
               title: "A Shared Vision for the Future",
               content: [
                  "The success of these cultural collaborations signals a growing recognition that cultural diplomacy is as vital as economic partnership. By investing in creativity, learning, and shared heritage, Korea and India are laying the foundation for a resilient and forward-looking partnership.",
                  "As participation continues to rise and joint projects expand in scope, the Korea–India cultural bridge promises to evolve into a dynamic platform for innovation, understanding, and shared human experience — reminding us that true progress is built not just on trade and technology, but on the connection of hearts and ideas."
               ]
            }
         ],
         quote: {
            text: "Cultural diplomacy is as vital as economic partnership in building lasting international relationships",
            author: "KOFICE Director"
         }
      }
   };

   const currentBlog = blogContent[blogId as keyof typeof blogContent] || blogContent[1];

   return (
      <section className="blog-details-section section-bg pt-100 pb-100">
         <div className="container">
            <div className="row g-sm-4 g-3 justify-content-center align-items-end">
               <div className="col-lg-9">
                  <div className="blog-details-thumb rounded-4 w-100 mb-40 position-relative wow fadeInUp"
                     data-wow-delay=".4s">
                     <img src={currentBlogData?.thumb || "/assets/img/blog/blog-details-big1.png"} alt="Korea India Relations" className="w-100 rounded-4" loading="lazy" style={{height: '400px', objectFit: 'cover'}} />
                     <div className="social-icon blog-details-social d-flex align-items-center">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                           <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                           <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                           <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                           <i className="fa-brands fa-pinterest-p"></i>
                        </a>
                     </div>
                  </div>
                  <h3 className="theme-clr4 mb-3 fz-36 wow fadeInUp" data-wow-delay=".2s">{currentBlog.title}</h3>
                  <div className="d-flex align-items-center gap-3 fz-14 mb-40 wow fadeInUp" data-wow-delay=".4s">
                     <span className="fw-600 theme-clr4">{currentBlog.author}</span> / {currentBlog.date}
                  </div>
                  <p className="theme-clr4 mb-xl-3 mb-2 wow fadeInUp" data-wow-delay=".6s">
                     <strong>{currentBlog.subtitle}</strong>
                  </p>
                  {currentBlog.content.map((paragraph: string, index: number) => (
                     <p key={index} className="theme-clr4 mb-40 wow fadeInUp" data-wow-delay=".5s">
                        {paragraph}
                     </p>
                  ))}
                  {currentBlog.sections.map((section: any, sectionIndex: number) => (
                     <div key={sectionIndex}>
                        <h4 className="theme-clr4 mb-3 wow fadeInUp" data-wow-delay=".3s">{section.title}</h4>
                        {section.content.map((paragraph: string, paragraphIndex: number) => (
                           <p key={paragraphIndex} className="theme-clr4 mb-40 wow fadeInUp" data-wow-delay=".5s">
                              {paragraph}
                           </p>
                        ))}
                        {section.list && (
                           <ul className="theme-clr4 mb-40 wow fadeInUp" data-wow-delay=".5s" style={{paddingLeft: '20px'}}>
                              {section.list.map((item: string, itemIndex: number) => (
                                 <li key={itemIndex} style={{marginBottom: '10px'}}>{item}</li>
                              ))}
                           </ul>
                        )}
                     </div>
                  ))}
                  <div className="mb-lg-5 mb-4 quote-box d-flex gap-xxl-4 gap-xl-3 gap-2 wow fadeInUp"
                     data-wow-delay=".3s">
                     <img width="70" height="50" src="/assets/img/blog/quoe-blog.png" alt="img" />
                     <div>
                        <h3 className="italic fw-500 mb-sm-2 mb-1">{currentBlog.quote.text}</h3>
                        <span className="theme-clr4"> - {currentBlog.quote.author}</span>
                     </div>
                  </div>
                  <div className="d-flex post-viewer align-items-center justify-content-between flex-md-nowrap flex-wrap gap-3 mb-lg-5 mb-4">
                     <div>
                        <span className="text-uppercase theme-clr4 fz-12 d-block">Previous post</span>
                        <h5 className="theme-clr4">
                           {blogId === 1 ? "Korean Investment Opportunities" : 
                            blogId === 2 ? "Korea-India Trade Relations" : 
                            "Korean Startups in India"}
                        </h5>
                     </div>
                     <div className="text-md-end">
                        <span className="text-uppercase theme-clr4 fz-12 d-block">Next post</span>
                        <h5 className="theme-clr4">
                           {blogId === 1 ? "Korean Startups in India" : 
                            blogId === 2 ? "Cultural Exchange Programs" : 
                            "Future Collaborations"}
                        </h5>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default BlogDetailsArea
