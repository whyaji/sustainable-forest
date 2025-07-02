import { Route } from '@/routes/_authenticated/data/pohon/$treeId/survey-history/$surveyHistoryId/update/index.js';

import { FormSurveyHistory } from '../components/form-survey-history/FormSurveyHistory.js';

export function UpdateSurveyHistoryTreeScreen() {
  const { survey } = Route.useLoaderData();
  return <FormSurveyHistory title="Update Survey Tree" survey={survey} tree={survey?.tree} />;
}
