import AnimatedSection from '../components/ui/AnimatedSection'
import ArticleCard from '../components/sections/ArticleCard'
import articles from '../data/blog.json'

export default function Blog() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Resources</h1>
          <p className="text-text-secondary text-lg">
            Articles, tutorials, and updates from the RepoHub team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
