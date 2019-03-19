并非一个tab一个进程，chrome最新采用`站点隔离`策略，通常情况下会把一个站点(好像是有相同refer的)的多个tab也分到一个进程（render process）里. (可以通过)
所以如果一个当前站点的tab进程卡死，其余tab也卡死了
（上述理解可能有误，）详情看google文档

**Caveats**
This section lists a few caveats with Chromium's current implementation of the process models, along with their implications.
Most renderer-initiated navigations within a tab do not yet lead to process swaps. If the user follows a link, submits a form, or is redirected by a script, Chromium will not attempt to switch renderer processes in the tab if the navigation is cross-site. Chromium only swaps renderer processes for browser-initiated cross-site navigations, such as typing a URL in the location bar or following a bookmark. As a result, pages from different sites may be rendered in the same process, even in the process-per-site-instance and process-per-site models. This is likely to change in future versions of Chromium as part of the Site Isolation project.

However, there is a mechanism web pages can use to suggest that a link points to an unrelated page and can be safely rendered in a different process.  If a link has the rel=noreferrer target=_blank attributes, then Chromium will typically render it in a different process.

Subframes are currently rendered in the same process as their parent page. Although cross-site subframes do not have script access to their parents and could safely be rendered in a separate process, Chromium does not yet render them in their own processes. Similar to the first caveat, this means that pages from different sites may be rendered in the same process. This will likely change in future versions of Chromium.

There is a limit to the number of renderer processes that Chromium will create. This prevents the browser from overwhelming the user's computer with too many processes. The limit is is proportional to the amount of memory on the computer, and may be as high as 80 processes. Because of the limit, a single renderer process may be dedicated to multiple sites. This reuse is currently done at random, but future versions of Chromium may apply heuristics to more intelligently allocate sites to renderer processes.


``````
**https://developers.google.com/web/updates/2018/09/inside-browser-part1**
https://juejin.im/entry/59b89c88f265da0664641382
https://www.chromium.org/developers/design-documents/site-isolation
https://chromium.googlesource.com/chromium/src/+/HEAD/docs/threading_and_tasks.md
https://www.zybuluo.com/rogeryi/note/16138
**https://www.chromium.org/developers/design-documents/process-models**
