### Expanding Menu

# How To Run
Simply ensure that expo is available as according to the documentation provided below:
https://docs.expo.dev/router/installation/#manual-installation

The app has a simple interface. It essentially provides checkbox functionality and "summary" functionalities.
The app has been implemented in a recursive fashion. There are 4 possible levels of depth i.e. Product, Brand, Model, and Variant.
The Variant level is our "leaf" level.

# Chehckboxes
- If a variant/leaf is selected, it is identified in the "Selected Variant" chips section.
- If a non-leaf option is selected e.g. Product/Brand/Model, then all its children are collapsed and cocnsidered "selected". Any previous selections are removed.
- If a non-leaf option is unselected, it is expanded and again all child selections are discarded.

# Summaries
- Summaries exist on "variant" nodes and in the "selected variants" section.
- For nodes, summaries are available only when the item is collapsed nd there are somem child elements. The summary shows the sub options.
- For variant nodes, the summary also shows the qunatity of the available variants.
- For Selected Variants section, if a category is selected, then the summary states "All ${category} devices".
- For Selected Variants section, if a variant is selected, then the summary lists all variants, grouped by their parent category.

![image](https://github.com/Raja-Salman-Tariq/ExpandingMenu/assets/46603998/8937fbf9-c6fd-4242-a9a6-05aa5d5a7b01)
![image](https://github.com/Raja-Salman-Tariq/ExpandingMenu/assets/46603998/cd00ee74-93f9-4b1a-b399-c397cab913a2)
![image](https://github.com/Raja-Salman-Tariq/ExpandingMenu/assets/46603998/08d691b3-1620-4fbb-a9cf-88bebab19735)

