import React from 'react';
import { siteConfig } from '@/config/site';

/**
 * HiddenGallery Component
 * 
 * This component renders an image gallery that is visually hidden from users
 * but remain accessible in the DOM for search engine crawlers (especially Google Bot).
 * This helps in indexing portfolio images without affecting the visual design of the home page.
 */
interface HiddenGalleryProps {
    projects?: import('@/types').Project[];
}

const HiddenGallery = ({ projects = [] }: HiddenGalleryProps) => {
    return (
        <section
            id="hidden-seo-gallery"
            aria-hidden="true"
            className="sr-only"
            style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
            }}
        >
            <h2>Portfolio Image Gallery - Shireff Nady</h2>
            <p>
                A collection of professional photos and project screenshots showcasing the work
                and expertise of Shireff Nady.
            </p>

            <div className="gallery-container">
                {/* Personal Images */}
                {siteConfig.personalImages.filter(img => img.url).map((image, index) => (
                    <figure key={`${image.url}-${index}`}>
                        <img
                            src={image.url}
                            alt={image.alt}
                            title={image.title}
                            loading="lazy"
                            width={800}
                            height={800}
                        />
                        <figcaption>{image.title}</figcaption>
                    </figure>
                ))}

                {/* Project Images */}
                {projects.filter(p => !!p.img).map((project, index) => (
                    <figure key={`proj-${project.id}-${index}`}>
                        <img
                            src={project.img!}
                            alt={project.title}
                            title={project.title}
                            loading="lazy"
                            width={1200}
                            height={800}
                        />
                        <figcaption>{project.title} - Project Portfolio Image</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
};

export default HiddenGallery;
