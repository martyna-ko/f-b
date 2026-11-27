import { useState } from 'react';
import { Tabs } from '../components/Tabs';
import { DAY_ORDER, weeklySchedule, type Audience } from '../content';
import { useLocale } from '../i18n/locale';
import { ClassGrid } from '../sections/ClassGrid';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

type Filter = Audience | 'all';

/** 5.0 Schedule — weekly plan, filterable by audience. */
export function SchedulePage() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>('all');
  const entries = weeklySchedule(filter === 'all' ? undefined : filter);
  const days = DAY_ORDER.filter((d) => entries.some((e) => e.day === d));

  return (
    <>
      <PageIntro title={t.schedule.title} lead={t.schedule.lead} />
      <Section>
        <Tabs
          label={t.schedule.filterLabel}
          value={filter}
          onChange={(v) => setFilter(v as Filter)}
          items={(['all', 'kids', 'family', 'adults'] as const).map((v) => ({
            value: v,
            label: t.common.audiences[v],
          }))}
        >
          {days.map((day) => (
            <div key={day}>
              <h2 className={list.dayTitle}>{t.common.days[day]}</h2>
              <ClassGrid entries={entries.filter((e) => e.day === day)} />
            </div>
          ))}
        </Tabs>
      </Section>
    </>
  );
}
