'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, TrendingUp, Clock } from 'lucide-react';
import { cn, formatPatientCount, formatPercentage, formatCost } from '@/lib/utils';
import { Button } from './Button';

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    impact: string;
    imageUrl: string;
    imageAlt: string;
    caseStudyUrl: string;
    featured?: boolean;
    metrics?: {
      patients?: number;
      costReduction?: number;
      efficiency?: number;
      accuracy?: number;
    };
    techStack?: string[];
  };
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
  onInteraction?: (event: 'view' | 'click', projectId: string) => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, variant = 'default', className, onInteraction }, ref) => {
    const handleClick = () => {
      onInteraction?.('click', project.id);
    };

    const handleView = () => {
      onInteraction?.('view', project.id);
    };

    return (
      <article
        ref={ref}
        className={cn(
          'project-card group h-full flex flex-col',
          variant === 'featured' && 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-lg',
          variant === 'compact' && 'p-4',
          className
        )}
        onMouseEnter={handleView}
        onFocus={handleView}
        role="article"
        aria-labelledby={`project-title-${project.id}`}
        aria-describedby={`project-description-${project.id}`}
      >
        {/* Project Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-6 bg-gray-100">
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={project.featured}
          />
          {project.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="space-y-4 flex-grow flex flex-col">
          <div>
            <h3 
              id={`project-title-${project.id}`}
              className="text-xl font-bold text-gray-900 transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent"
            >
              {project.title}
            </h3>
            <p 
              id={`project-description-${project.description}`}
              className="text-gray-600 text-base leading-relaxed mt-2"
            >
              {project.description}
            </p>
          </div>

          {/* Impact Statement */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg border border-teal-100">
            <p className="text-sm font-medium" style={{ color: 'var(--color-healthcare-blue)' }}>
              Healthcare Impact
            </p>
            <p className="text-gray-700 mt-1 font-medium">{project.impact}</p>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.patients && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 mr-1" style={{ color: 'var(--color-medical-teal)' }} />
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-medical-teal)' }}>
                    {formatPatientCount(project.metrics.patients)}
                  </div>
                  <div className="text-xs text-gray-500">Patients Served</div>
                </div>
              )}
              
              {project.metrics.costReduction && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 mr-1" style={{ color: 'var(--color-success)' }} />
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>
                    {formatPercentage(project.metrics.costReduction)}
                  </div>
                  <div className="text-xs text-gray-500">Cost Reduction</div>
                </div>
              )}

              {project.metrics.accuracy && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="h-4 w-4 mr-1" style={{ color: 'var(--color-innovation-orange)' }} />
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-innovation-orange)' }}>
                    {formatPercentage(project.metrics.accuracy)}
                  </div>
                  <div className="text-xs text-gray-500">Accuracy Rate</div>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-2 mt-auto">
            <Link 
              href={project.caseStudyUrl}
              className="inline-flex items-center justify-center w-full h-11 px-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all group/btn"
              onClick={handleClick}
              aria-label={`View ${project.title} case study`}
            >
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export { ProjectCard };