import { notFound } from 'next/navigation'
import expertsData from '../../expertsData'
import ExpertProfileClient from './ExpertProfileClient'
import LayoutPage from '@/app/dashboard/LayoutPage'

interface PageProps {
    params: Promise<{ 
        slug: string;
        id: string;
   
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug, id } = await params;

    const experts = expertsData[slug as keyof typeof expertsData];

    if (!experts) {
        notFound();
    }

    const expert = experts.find(e => e.id.toString() === id);

    if (!expert) {
        notFound();
    }

    return (
        <LayoutPage>
            <ExpertProfileClient params={Promise.resolve({ expert, slug })} />
        </LayoutPage>
    )
}

