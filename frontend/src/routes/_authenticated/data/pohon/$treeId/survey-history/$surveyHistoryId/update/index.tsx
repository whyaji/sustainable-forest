import { createFileRoute } from '@tanstack/react-router';

import { UpdateSurveyHistoryTreeScreen } from '@/features/data/screen/survey-history/screen/UpdateSurveyHistoryTreeScreen';
import { getSurveyHistory } from '@/lib/api/surveyHistoryApi';

export const Route = createFileRoute(
  '/_authenticated/data/pohon/$treeId/survey-history/$surveyHistoryId/update/'
)({
  loader: async ({ params }) => {
    try {
      const res = await getSurveyHistory(params.surveyHistoryId, 'treeId');
      return { survey: res.data };
    } catch {
      return { survey: null };
    }
  },
  component: UpdateSurveyHistoryTreeScreen,
});
