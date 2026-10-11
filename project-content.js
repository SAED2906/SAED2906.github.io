/* Edit this file directly on GitHub, then commit to update the allocator page.
   repoUrl: paste your HTTPS GitHub repository URL. Leave empty to hide the link.
   code: paste your example between the backticks. Escape literal backticks as \`
   and literal ${ as \${ when they occur inside the example.
*/
window.projectContent = {
  'memory-allocator': {
    repoUrl: 'https://github.com/SAED2906/MemoryAllocator',
    codeTitle: 'Usage example',
    codeDescription: 'An illustrative example of allocating a block, using the memory and releasing tracked allocations.',
    filename: 'example.cpp',
    language: 'C++',
    code: String.raw`#include "memalloc.h"
#include <iostream>

int main() {
    int* values = (int*) malloc(5 * sizeof(int));
    if (values == nullptr) {
        return 1;
    }

    for (int i = 0; i < 5; ++i) {
        values[i] = i + 1;
        std::cout << values[i] << '\n';
    }

    // Release all allocations tracked by the allocator.
    global_free();
    return 0;
}`
  }
};
